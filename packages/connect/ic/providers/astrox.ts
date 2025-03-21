import { IC } from '@astrox/sdk-web';
import { DelegationMode } from '@astrox/sdk-web/build/types';
import type { ActorSubclass, Identity } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';
import { err, ok, Result } from 'neverthrow';

// @ts-expect-ignore
import astroXLogoLight from './svg/astrox_light.svg';
// @ts-expect-ignore
import astroXLogoDark from './svg/astrox.png';
import type { IConnector, IWalletConnector } from './types';
import {
    BalanceError,
    ConnectError,
    CreateActorError,
    DisconnectError,
    iiDerivationOrigin,
    InitError,
    TransferError,
} from './types';

export enum PermissionsType {
    identity = 'permissions-identity',
    wallet = 'permissions-wallet',
}

// const balanceFromString = (balance: string, decimal = 8): bigint => {
//     const list = balance.split('.');
//     const aboveZero = list[0];
//     const aboveZeroBigInt = BigInt(aboveZero) * BigInt(1 * 10 ** decimal);
//     let belowZeroBigInt = BigInt(0);
//     const belowZero = list[1];
//     if (belowZero !== undefined) {
//         belowZeroBigInt = BigInt(belowZero.substring(0, decimal).padEnd(decimal, '0'));
//     }
//     return aboveZeroBigInt + belowZeroBigInt;
// };

export class CustomAstroX implements IConnector, IWalletConnector {
    public meta = {
        features: ['wallet'],
        icon: {
            light: astroXLogoLight,
            dark: astroXLogoDark,
        },
        id: 'astrox',
        name: 'AstroX ME',
    };

    #config: {
        whitelist: string[];
        providerUrl: string;
        ledgerCanisterId: string;
        ledgerHost?: string;
        noUnify?: boolean;
        host: string;
        dev: boolean;
        delegationModes?: DelegationMode[];
        customDomain?: string;
    };
    #identity?: Identity;
    #principal?: string;
    #ic?: IC;
    #wallet?: {
        principal: string;
        accountId: string;
    };

    get principal() {
        return this.#principal;
    }

    get wallets() {
        return this.#wallet ? [this.#wallet] : [];
    }

    constructor(userConfig = {}) {
        this.#config = {
            whitelist: [],
            providerUrl: 'https://63k2f-nyaaa-aaaah-aakla-cai.raw.ic0.app',
            ledgerCanisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
            ledgerHost: 'https://boundary.ic0.app/',
            // host: window.location.origin,
            host: 'https://icp-api.io',
            dev: false,
            noUnify: false,
            delegationModes: ['global'],
            customDomain: iiDerivationOrigin,
            ...userConfig,
        };
    }

    set config(config) {
        this.#config = { ...this.#config, ...config };
    }

    get config() {
        return this.#config;
    }

    async init(whitelist?: string[]) {
        try {
            const ic = await IC.create({
                useFrame: !(window.innerWidth < 768),
                signerProviderUrl: `${this.#config.providerUrl}/#signer`,
                walletProviderUrl: `${this.#config.providerUrl}/#transaction`,
                identityProvider: `${this.#config.providerUrl}/#authorize`,
                permissions: [PermissionsType.identity, PermissionsType.wallet],
                host: this.#config.host,
                ledgerCanisterId: this.#config.ledgerCanisterId,
                ledgerHost: this.#config.ledgerHost,
                dev: this.#config.dev,
                delegationTargets: [
                    ...this.#config.whitelist,
                    ...(whitelist ?? []),
                    ...(this.#ic?.delegationTargets ?? []),
                ],
                delegationModes: this.#config.delegationModes,
                noUnify: this.#config.noUnify,
                customDomain: this.#config.customDomain,
            });
            this.#ic = whitelist ? ic : (((window as any).ic.astrox as IC) ?? ic);
            console.debug(`🚀 ~ CustomAstroX ~ init ~ this.#ic:`, this.#ic);
            this.#principal = this.#ic.principal.toText();
            // TODO: export Identity from @astrox/connection
            // @ts-expect-ignore
            this.#identity = this.#ic.identity as any;
            const isConnected = await this.isConnected();
            if (isConnected) {
                // @ts-expect-ignore
                this.#identity = this.#ic.identity as any;
                this.#principal = this.#ic.principal.toText();
                this.#wallet = this.#ic.wallet;
            }
            return ok({ isConnected });
        } catch (e) {
            console.error(e);
            return err({ kind: InitError.InitFailed });
        }
    }

    async isConnected(): Promise<boolean> {
        try {
            if (!this.#ic) {
                return false;
            }
            return await this.#ic.isAuthenticated();
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    // TODO: export & use types from astrox/connection instead of dfinity/agent
    async createActor<Service>(
        canisterId: string,
        idlFactory: IDL.InterfaceFactory,
    ): Promise<Result<ActorSubclass<Service>, any>> {
        try {
            if (!this.#ic) {
                return err({ kind: CreateActorError.NotInitialized });
            }
            if (!this.#ic?.delegationTargets?.includes(canisterId)) {
                // Request white list
                console.log('astrox me init again. whitelist ->', canisterId);
                await this.init([canisterId]);
            }
            // @ts-expect-ignore
            const actor = await this.#ic.createActor<Service>(idlFactory as any, canisterId);
            // @ts-expect-ignore
            return ok(actor) as any;
        } catch (e) {
            console.error(e);
            return err({ kind: CreateActorError.CreateActorFailed });
        }
    }

    async connect() {
        try {
            if (!this.#ic) {
                return err({ kind: ConnectError.NotInitialized });
            }
            await this.#ic.connect({
                useFrame: !(window.innerWidth < 768),
                signerProviderUrl: `${this.#config.providerUrl}/#signer`,
                walletProviderUrl: `${this.#config.providerUrl}/#transaction`,
                identityProvider: `${this.#config.providerUrl}/#authorize`,
                permissions: [PermissionsType.identity, PermissionsType.wallet],
                host: this.#config.host,
                dev: this.#config.dev,
                ledgerCanisterId: this.#config.ledgerCanisterId,
                ledgerHost: this.#config.ledgerHost,
                delegationTargets: this.#config.whitelist,
                noUnify: this.#config.noUnify,
                delegationModes: this.#config.delegationModes,
                customDomain: this.#config.customDomain,
            });
            this.#principal = this.#ic.principal.toText();
            // @ts-expect-ignore
            this.#identity = this.#ic.identity as any;
            this.#wallet = this.#ic.wallet;
            return ok(true);
        } catch (e) {
            console.error(e);
            return err({ kind: ConnectError.ConnectFailed });
        }
    }

    async disconnect() {
        try {
            await this.#ic?.disconnect();
            return ok(true);
        } catch (e) {
            console.error(e);
            return err({ kind: DisconnectError.DisconnectFailed });
        }
    }

    async requestTransfer(opts: {
        amount: number;
        to: string;
        symbol?: string;
        standard?: string;
        decimals?: number;
        fee?: number;
        memo?: bigint | number[];
        createdAtTime?: Date;
        fromSubAccount?: number;
    }) {
        console.log('identity', this.#identity);
        const {
            to,
            amount,
            standard = 'ICP',
            symbol = 'ICP',
            decimals = 8,
            fee = 0,
            memo = BigInt(0),
            createdAtTime = new Date(),
            fromSubAccount = 0,
        } = opts;
        try {
            const result = await this.#ic?.requestTransfer({
                amount: BigInt(amount * 10 ** decimals),
                to,
                standard,
                symbol,
                // TODO: ?
                sendOpts: {
                    fee: BigInt(fee),
                    memo,
                    from_subaccount: fromSubAccount as any,
                    created_at_time: createdAtTime,
                },
            });
            // TODO: why string? check astrox-js
            if (typeof result === 'string') {
                return err({ kind: TransferError.FaultyAddress });
            }
            // check astrox-js
            if (!result) {
                return err({ kind: TransferError.TransferFailed });
            }
            switch (result?.kind) {
                case 'transaction-client-success':
                    return ok({
                        // TODO: why is payload optional? check astrox-js
                        height: Number(result.payload?.blockHeight),
                    });
                default:
                    return err({ kind: TransferError.TransferFailed });
            }
        } catch (e) {
            console.error(e);
            return err({ kind: TransferError.TransferFailed });
        }
    }

    // async requestTransferNFT(args: {
    //     tokenIdentifier: string;
    //     tokenIndex: number;
    //     canisterId: string;
    //     to: string;
    //     standard: string;
    //     fee?: number;
    //     memo?: bigint | Array<number>;
    //     createdAtTime?: Date;
    //     fromSubAccount?: number;
    // }) {
    //     try {
    //         const {
    //             tokenIdentifier,
    //             tokenIndex,
    //             canisterId,
    //             standard,
    //             to,
    //             fee = 0,
    //             memo = BigInt(0),
    //             createdAtTime = new Date(),
    //             fromSubAccount = 0,
    //         } = args;
    //         if (!this.#ic) {
    //             return err({ kind: TransferError.NotInitialized });
    //         }
    //         const response = await this.#ic.requestTransfer({
    //             tokenIdentifier,
    //             tokenIndex,
    //             canisterId,
    //             standard,
    //             to,
    //             sendOpts: {
    //                 fee: BigInt(fee),
    //                 memo,
    //                 from_subaccount: fromSubAccount as any,
    //                 created_at_time: createdAtTime,
    //             },
    //             symbol: '',
    //         });
    //         if (
    //             !response ||
    //             typeof response === 'string' ||
    //             response.kind === (TransactionMessageKind.fail as any)
    //         ) {
    //             return err({ kind: TransferError.TransferFailed });
    //         }
    //         if (response.kind === TransactionMessageKind.success) {
    //             return ok({
    //                 // TODO: fix
    //                 ...response.payload,
    //                 // height: Number(response.payload.blockHeight),
    //             });
    //         }
    //         return err({ kind: TransferError.TransferFailed });
    //     } catch (e) {
    //         console.error(e);
    //         return err({ kind: TransferError.TransferFailed });
    //     }
    // }

    async queryBalance() {
        try {
            const ICPBalance = Number(await this.#ic?.queryBalance());
            return ok([
                {
                    amount: ICPBalance / 100000000,
                    canisterId: this.#config.ledgerCanisterId,
                    decimals: 8,
                    // TODO: plug returns image?
                    // image: "Dfinity.svg",
                    name: 'ICP',
                    symbol: 'ICP',
                },
            ]);
        } catch (e) {
            console.error(e);
            return err({ kind: BalanceError.QueryBalanceFailed });
        }
    }

    // async signMessage({ message }: { message: string }): Promise<SignerResponseSuccess | string | undefined> {
    //   return this.#ic?.signMessage({
    //     signerProvider: this.#config.providerUrl,
    //     message,
    //   })
    // }

    // getManagementCanister: (...args) => this.#ic.getManagementCanister(...args),
    // batchTransactions: (...args) => this.#ic.batchTransactions(...args),
}
