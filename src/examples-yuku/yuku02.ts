import { LinkComponent } from '@jellypack/runtime/lib/model/components';
import { candid as yuku_core_candid } from '../examples/example03_candid';
import { candid as yuku_proxy_candid } from './yuku_proxy_candid';

export const app_id = 7807843197805336;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Yuku: Sell NFTs';
export const icon = 'https://file.easydapp.ai/image/dQx8Sn6508ff22c6fc.jpeg';
export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
        // Set parameter
        {
            param: {
                id: 1,
                metadata: { name: 'collection', default: 'goncb-kqaaa-aaaap-aakpa-cai' },
            },
        },
        // Calculate the diversion link
        {
            code: {
                id: 2,
                inlets: [{ id: 1 }],
                metadata: {
                    data: [{ key: 'collection', value: { refer: { endpoint: { id: 1 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `result = \`https://yuku.app/market/\${data.collection}\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        // canister
        {
            const: {
                id: 20,
                metadata: {
                    value: { text: 'udtw4-baaaa-aaaah-abc3q-cai' },
                },
                output: 'text',
            },
        },
        // Proxy canister
        {
            const: {
                id: 21,
                metadata: {
                    value: { text: 'owefd-waaaa-aaaah-abu2q-cai' },
                },
                output: 'text',
            },
        },
        // Anonymous http identity
        {
            identity: {
                id: 100,
                metadata: { metadata: { http: {} } },
            },
        },
        // Anonymous IC identity
        {
            identity: {
                id: 101,
                metadata: { metadata: { ic: {} } },
            },
        },
        // HTTP Get the floor price
        {
            code: {
                id: 200,
                inlets: [{ id: 1 }],
                metadata: {
                    data: [{ key: 'collection', value: { refer: { endpoint: { id: 1 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `result = \`https://stat.yuku.app/api/collection/\${data.collection}\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            call: {
                id: 201,
                inlets: [{ id: 100 }, { id: 200 }],
                metadata: {
                    http: {
                        trigger: {
                            loading: {
                                alive: 3600000,
                            },
                        },
                        identity: 100,
                        url: { refer: { endpoint: { id: 200 } } },
                        method: 'GET',
                        parsed: 'json',
                        post: {
                            code: {
                                code: {
                                    code: `
                                        if (data.code !== 200) throw new Error(\`HTTP call failed: \${data.msg}\`);
                                        result = {
                                            name: data.data.name,
                                            description: data.data.description,
                                            supply: data.data.supply,
                                            logo: data.data.logo ?? '',
                                            banner: data.data.banner ?? '',
                                            featured: data.data.featured ?? '',
                                            floor_price: Number(data.data.floor_price) / 1e8,
                                            volume: Number(data.data.volume) / 1e8,
                                            change_rate: data.data.change_rate,
                                        };
                                    `,
                                },
                                js: '',
                            },
                        },
                    },
                },
                output: {
                    object: [
                        { key: 'name', ty: 'text' },
                        { key: 'description', ty: 'text' },
                        { key: 'supply', ty: 'integer' },
                        { key: 'logo', ty: 'text' },
                        { key: 'banner', ty: 'text' },
                        { key: 'featured', ty: 'text' },
                        { key: 'floor_price', ty: 'number' },
                        { key: 'volume', ty: 'number' },
                        { key: 'change_rate', ty: 'text' },
                    ],
                },
            },
        },
        // IC acquisition ID
        {
            code: {
                id: 300,
                inlets: [{ id: 1 }],
                metadata: {
                    data: [{ key: 'collection', value: { refer: { endpoint: { id: 1 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `result = \`https://yuku-chain-ic-proxy.yuku.app/durable/nft/owner/prod?delay=30000&collections=\${data.collection}\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            call: {
                id: 301,
                inlets: [{ id: 100 }, { id: 300 }],
                metadata: {
                    http: {
                        trigger: {
                            loading: {
                                alive: 60000,
                            },
                        },
                        identity: 100,
                        url: { refer: { endpoint: { id: 300 } } },
                        method: 'GET',
                        parsed: 'json',
                        post: {
                            code: {
                                code: {
                                    code: `
                                        if (data.code !== 0) throw new Error(\`HTTP call failed: \${data.message}\`);
                                        if (data.data.length !== 1) throw new Error(\`HTTP call failed: no data\`);
                                        if (data.data[0].standards.includes('ORIGYN')) throw new Error(\`Origyn NFT is not supported.\`);
                                        const tokens: { id: number, account_id: string, proxy: string }[] = [];
                                        for (let i = 0; i < data.data[0].tokens.length; i++) {
                                            const [owner, ids] = data.data[0].tokens[i];
                                            tokens.push(...ids.map(id => ({
                                                id: parseInt(id),
                                                account_id: owner.AccountId
                                                    ? owner.AccountId.account_id
                                                    : OpenIc.principal2account_id(owner.Account.owner,
                                                        owner.Account.subaccount ? OpenHex.hex2array(owner.Account.subaccount) : undefined),
                                                proxy: (owner.AccountId ? owner.AccountId.proxy : owner.Account.proxy) ?? '',
                                            })));
                                        }
                                        tokens.sort((a, b) => a.id - b.id);
                                        result = {
                                            standards: data.data[0].standards,
                                            total: data.data[0].total,
                                            tokens,
                                        };
                                    `,
                                },
                                js: '',
                            },
                        },
                    },
                },
                output: {
                    object: [
                        { key: 'standards', ty: { array: 'text' } },
                        { key: 'total', ty: 'integer' },
                        {
                            key: 'tokens',
                            ty: {
                                array: {
                                    object: [
                                        {
                                            key: 'id',
                                            ty: 'integer',
                                        },
                                        {
                                            key: 'account_id',
                                            ty: 'text',
                                        },
                                        {
                                            key: 'proxy',
                                            ty: 'text',
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
            },
        },
        // HTTP acquisition of metadata
        {
            code: {
                id: 302,
                inlets: [{ id: 1 }],
                metadata: {
                    data: [{ key: 'collection', value: { refer: { endpoint: { id: 1 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `result = \`https://yuku-chain-ic-monitor.yuku.app/open/collection/metadata/find/\${data.collection}\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            call: {
                id: 303,
                inlets: [{ id: 100 }, { id: 302 }],
                metadata: {
                    http: {
                        trigger: {
                            loading: {
                                alive: 86400000,
                            },
                        },
                        identity: 100,
                        url: { refer: { endpoint: { id: 302 } } },
                        method: 'GET',
                        parsed: 'json',
                        post: {
                            code: {
                                code: {
                                    code: `
                                        if (data.code !== 0) throw new Error(\`HTTP call failed: \${data.message}\`);
                                        result = data.data.map(d => ({...d, name: d.name ?? '',  description: d.description ?? ''}));
                                    `,
                                },
                                js: '',
                            },
                        },
                    },
                },
                output: {
                    array: {
                        object: [
                            { key: 'token_id', ty: 'text' },
                            { key: 'mimeType', ty: 'text' },
                            { key: 'url', ty: 'text' },
                            { key: 'thumb', ty: 'text' },
                            { key: 'name', ty: 'text' },
                            { key: 'description', ty: 'text' },
                        ],
                    },
                },
            },
        },

        // Conditional judgment whether there is NFT
        {
            condition: {
                id: 500,
                inlets: [{ id: 401 }, { id: 402 }, { id: 600 }],
                metadata: {
                    conditions: [
                        {
                            or: [
                                {
                                    required: {
                                        value: { endpoint: { id: 401 } },
                                        matches: {
                                            array: 'null',
                                        },
                                    },
                                },
                                {
                                    required: {
                                        value: { endpoint: { id: 402 } },
                                        matches: {
                                            object: 'null',
                                        },
                                    },
                                },
                                {
                                    required: {
                                        value: { endpoint: { id: 600 } },
                                        matches: {
                                            integer: 'null',
                                        },
                                    },
                                },
                                {
                                    required: {
                                        value: { endpoint: { id: 402 }, refer: { key: 'values' } },
                                        matches: {
                                            array: {
                                                length_equal: { const: { integer: 0 } },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        },
        // Display no information on the shelf
        {
            view: {
                id: 501,
                inlets: [{ id: 500 }, { id: 201 }, { id: 2 }],
                metadata: {
                    image: {
                        value: { refer: { endpoint: { id: 201 }, refer: { key: 'featured' } } },
                        href: { refer: { endpoint: { id: 2 } } },
                    },
                },
            },
        },
        {
            view: {
                id: 502,
                inlets: [{ id: 500 }, { id: 201 }, { id: 2 }],
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 201 }, refer: { key: 'name' } } },
                        href: { refer: { endpoint: { id: 2 } } },
                    },
                },
            },
        },
        {
            view: {
                id: 503,
                inlets: [{ id: 500 }, { id: 201 }],
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 201 }, refer: { key: 'description' } } },
                    },
                },
            },
        },
        // Conditional judgment whether the floor price is displayed
        {
            condition: {
                id: 504,
                inlets: [{ id: 500 }, { id: 201 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 201 }, refer: { key: 'floor_price' } },
                                matches: {
                                    number: {
                                        greater: { const: { number: 0 } },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            code: {
                id: 505,
                inlets: [{ id: 500 }, { id: 504 }, { id: 201 }],
                metadata: {
                    data: [
                        {
                            key: 'floor',
                            value: {
                                refer: { endpoint: { id: 201 }, refer: { key: 'floor_price' } },
                            },
                        },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `result = \`Floor Price: \${Math.round(data.floor * 100) / 100} ICP\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            view: {
                id: 506,
                inlets: [{ id: 505 }],
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 505 } } },
                    },
                },
            },
        },
        // Conditional judgment whether it shows 0 NFT
        {
            condition: {
                id: 510,
                inlets: [{ id: 402 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 402 }, refer: { key: 'values' } },
                                matches: {
                                    array: {
                                        length_equal: { const: { integer: 0 } },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 511,
                inlets: [{ id: 510 }, { id: 2 }],
                metadata: {
                    text: {
                        value: { const: { text: 'You have 0 NFTs. Go to Yuku.' } },
                        href: { refer: { endpoint: { id: 2 } } },
                    },
                },
            },
        },

        // Login IC identity
        {
            identity: {
                id: 102,
                inlets: [{ id: 201 }, { id: 303 }],
                metadata: {
                    metadata: {
                        ic: {
                            includes: [{ any: {} }],
                            connect: { const: { text: 'Connect Wallet' } },
                        },
                    },
                },
            },
        },
        // IC obtain information on the shelf
        {
            call: {
                id: 400,
                inlets: [{ id: 1 }, { id: 102 }, { id: 301 }, { id: 20 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 20 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'nftInfosByCollection',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'collection',
                                                value: { refer: { endpoint: { id: 1 } } },
                                            },
                                            {
                                                key: 'tokens',
                                                value: {
                                                    refer: {
                                                        endpoint: { id: 301 },
                                                        refer: { key: 'tokens' },
                                                    },
                                                },
                                            },
                                            {
                                                key: 'account_id',
                                                value: {
                                                    refer: {
                                                        endpoint: { id: 102 },
                                                        refer: { key: 'account_id' },
                                                    },
                                                },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = [Principal.fromText(data.collection), data.tokens.filter(d => d.account_id === data.account_id).map(d => d.id)];`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = data.map((d, index) => {
                                                    const fixed = d.listing.fixed;
                                                    if (!fixed) {
                                                        return {
                                                            token_id: \`\${args[1][index]}\`,
                                                            token_identifier: OpenIc.ext_index2identifier(data_of_args.collection, args[1][index]),
                                                            seller: '',
                                                            proxy: '',
                                                            token: {
                                                                canister: '',
                                                                symbol: '',
                                                                decimal: 1,
                                                                fee: '0',
                                                            },
                                                            price: '0',
                                                            last_price: \`\${d.lastPrice}\`,
                                                            updated: Number(\`\${(d.listTime[0] ?? 0n) / 1000000n}\`),
                                                        };
                                                    }
                                                    const token_index = OpenIc.ext_identifier2index(fixed.tokenIdentifier);
                                                    return {
                                                        token_id: \`\${token_index}\`,
                                                        token_identifier: fixed.tokenIdentifier,
                                                        seller: fixed.seller.toText(),
                                                        proxy: data_of_args.tokens.find(dd => dd.id === token_index)?.proxy ?? '',
                                                        token: {
                                                            canister: fixed.token.canister,
                                                            symbol: fixed.token.symbol,
                                                            decimal: Number(\`\${fixed.token.decimal}\`),
                                                            fee: \`\${fixed.token.fee}\`,
                                                        },
                                                        price: \`\${fixed.price}\`,
                                                        last_price: \`\${d.lastPrice}\`,
                                                        updated: Number(\`\${(d.listTime[0] ?? 0n) / 1000000n}\`),
                                                    };
                                                });`,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: {
                    array: {
                        object: [
                            { key: 'token_id', ty: 'text' },
                            { key: 'token_identifier', ty: 'text' },
                            { key: 'seller', ty: 'text' },
                            { key: 'proxy', ty: 'text' },
                            {
                                key: 'token',
                                ty: {
                                    object: [
                                        { key: 'canister', ty: 'text' },
                                        { key: 'symbol', ty: 'text' },
                                        { key: 'decimal', ty: 'integer' },
                                        { key: 'fee', ty: 'text' },
                                    ],
                                },
                            },
                            { key: 'price', ty: 'text' },
                            { key: 'last_price', ty: 'text' },
                            { key: 'updated', ty: 'integer' },
                        ],
                    },
                },
            },
        },
        {
            code: {
                id: 401,
                inlets: [{ id: 303 }, { id: 400 }, { id: 201 }],
                metadata: {
                    data: [
                        { key: 'tokens', value: { refer: { endpoint: { id: 400 } } } },
                        { key: 'metadata', value: { refer: { endpoint: { id: 303 } } } },
                        { key: 'info', value: { refer: { endpoint: { id: 201 } } } },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `
                                    const tokens = data.tokens;
                                    tokens.sort((a, b) => {
                                        if (a.token.canister === b.token.canister) return Number(b.price) - Number(a.price);
                                        if (a.token.symbol === 'ICP') return 1;
                                        if (b.token.symbol === 'ICP') return -1;
                                        return 0;
                                    })
                                    result = tokens.map(d => {
                                        const metadata = data.metadata.find(m => m.token_id === d.token_id);
                                        if (metadata.name === '') metadata.name = \`\${data.info.name} #\${d.token_id}\`;
                                        return {...d, metadata }
                                    });
                                `,
                            },
                            js: '',
                        },
                    },
                },
                output: {
                    array: {
                        object: [
                            { key: 'token_id', ty: 'text' },
                            { key: 'token_identifier', ty: 'text' },
                            { key: 'seller', ty: 'text' },
                            { key: 'proxy', ty: 'text' },
                            {
                                key: 'token',
                                ty: {
                                    object: [
                                        { key: 'canister', ty: 'text' },
                                        { key: 'symbol', ty: 'text' },
                                        { key: 'decimal', ty: 'integer' },
                                        { key: 'fee', ty: 'text' },
                                    ],
                                },
                            },
                            { key: 'price', ty: 'text' },
                            { key: 'last_price', ty: 'text' },
                            { key: 'updated', ty: 'integer' },
                            {
                                key: 'metadata',
                                ty: {
                                    object: [
                                        { key: 'token_id', ty: 'text' },
                                        { key: 'mimeType', ty: 'text' },
                                        { key: 'url', ty: 'text' },
                                        { key: 'thumb', ty: 'text' },
                                        { key: 'name', ty: 'text' },
                                        { key: 'description', ty: 'text' },
                                    ],
                                },
                            },
                        ],
                    },
                },
            },
        },
        {
            code: {
                id: 402,
                inlets: [{ id: 401 }],
                metadata: {
                    data: [{ key: 'items', value: { refer: { endpoint: { id: 401 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `
                                    result = {
                                        values: data.items.map(d => d.metadata.name),
                                        tips: data.items.map(d => {
                                            if (Number(d.price) <= 0) return '';
                                            const text = \`\${Math.floor(Number(d.price) * 100 / Number(OpenNumber.unit(d.token.decimal))) / 100}\`
                                            return \`\${OpenNumber.format_integer(text)} \${d.token.symbol}\`;
                                        }),
                                    };
                                `,
                            },
                            js: '',
                        },
                    },
                },
                output: {
                    object: [
                        { key: 'values', ty: { array: 'text' } },
                        { key: 'tips', ty: { array: 'text' } },
                    ],
                },
            },
        },

        // Show selecting a certain
        {
            view: {
                id: 801,
                inlets: [{ id: 800 }, { id: 799 }],
                metadata: {
                    image: {
                        value: {
                            refer: {
                                endpoint: { id: 800 },
                                refer: { key: 'metadata', refer: { key: 'url' } },
                            },
                        },
                        href: { refer: { endpoint: { id: 799 } } },
                    },
                },
            },
        },
        {
            view: {
                id: 803,
                inlets: [{ id: 800 }, { id: 799 }],
                metadata: {
                    text: {
                        value: {
                            refer: {
                                endpoint: { id: 800 },
                                refer: { key: 'metadata', refer: { key: 'name' } },
                            },
                        },
                        href: { refer: { endpoint: { id: 799 } } },
                    },
                },
            },
        },
        // Conditional judgment whether the last price is displayed
        {
            condition: {
                id: 804,
                inlets: [{ id: 800 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 800 }, refer: { key: 'last_price' } },
                                matches: {
                                    text: {
                                        not_equal: { const: { text: '0' } },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            code: {
                id: 805,
                inlets: [{ id: 800 }, { id: 804 }],
                metadata: {
                    data: [
                        {
                            key: 'last',
                            value: {
                                refer: { endpoint: { id: 800 }, refer: { key: 'last_price' } },
                            },
                        },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `result = \`Last Price: \${Math.round(Number(data.last) / 1e8 * 100) / 100} ICP\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            view: {
                id: 806,
                inlets: [{ id: 805 }],
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 805 } } },
                    },
                },
            },
        },
        {
            condition: {
                id: 899,
                inlets: [{ id: 800 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 800 }, refer: { key: 'price' } },
                                matches: {
                                    text: {
                                        not_equal: { const: { text: '0' } },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            code: {
                id: 900,
                inlets: [{ id: 800 }, { id: 899 }],
                metadata: {
                    data: [{ key: 'item', value: { refer: { endpoint: { id: 800 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `
                                    const text = \`\${Number(data.item.price) / Number(OpenNumber.unit(data.item.token.decimal))}\`
                                    result = \`Current Price: \${OpenNumber.format_integer(text)} \${data.item.token.symbol}\`;
                                `,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            view: {
                id: 901,
                inlets: [{ id: 900 }],
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 900 } } },
                    },
                },
            },
        },
        {
            interaction: {
                id: 600,
                inlets: [{ id: 402 }, { id: 510, index: 1 }],
                metadata: {
                    metadata: {
                        choose_tip: {
                            values: { refer: { endpoint: { id: 402 }, refer: { key: 'values' } } },
                            tips: { refer: { endpoint: { id: 402 }, refer: { key: 'tips' } } },
                            style: JSON.stringify({
                                placeholder: 'Choose NFT',
                                outputLabel: 'NFT',
                            }),
                        },
                    },
                },
            },
        },
        {
            code: {
                id: 800,
                inlets: [{ id: 401 }, { id: 600 }],
                metadata: {
                    data: [
                        { key: 'items', value: { refer: { endpoint: { id: 401 } } } },
                        { key: 'index', value: { refer: { endpoint: { id: 600 } } } },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `result = data.items[data.index];`,
                            },
                            js: '',
                        },
                    },
                },
                output: {
                    object: [
                        { key: 'token_id', ty: 'text' },
                        { key: 'token_identifier', ty: 'text' },
                        { key: 'seller', ty: 'text' },
                        { key: 'proxy', ty: 'text' },
                        {
                            key: 'token',
                            ty: {
                                object: [
                                    { key: 'canister', ty: 'text' },
                                    { key: 'symbol', ty: 'text' },
                                    { key: 'decimal', ty: 'integer' },
                                    { key: 'fee', ty: 'text' },
                                ],
                            },
                        },
                        { key: 'price', ty: 'text' },
                        { key: 'last_price', ty: 'text' },
                        { key: 'updated', ty: 'integer' },
                        {
                            key: 'metadata',
                            ty: {
                                object: [
                                    { key: 'token_id', ty: 'text' },
                                    { key: 'mimeType', ty: 'text' },
                                    { key: 'url', ty: 'text' },
                                    { key: 'thumb', ty: 'text' },
                                    { key: 'name', ty: 'text' },
                                    { key: 'description', ty: 'text' },
                                ],
                            },
                        },
                    ],
                },
            },
        },
        {
            code: {
                id: 799,
                inlets: [{ id: 800 }, { id: 1 }],
                metadata: {
                    data: [
                        { key: 'collection', value: { refer: { endpoint: { id: 1 } } } },
                        { key: 'item', value: { refer: { endpoint: { id: 800 } } } },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `result = \`https://yuku.app/market/\${data.collection}/\${data.item.token_identifier}\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            code: {
                id: 999,
                inlets: [{ id: 800 }],
                metadata: {
                    data: [{ key: 'item', value: { refer: { endpoint: { id: 800 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `result = \`Cancel sell \${data.item.metadata.name}\``,
                            },
                            js: '',
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            call: {
                id: 1000,
                inlets: [{ id: 899 }, { id: 800 }, { id: 999 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { refer: { endpoint: { id: 999 } } } } },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 20 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'unSell',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = data.item.token_identifier;`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = data.ok;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'text',
            },
        },
        {
            view: {
                id: 1001,
                inlets: [{ id: 1000 }],
                metadata: {
                    text: { value: { const: { text: 'Cancel sell successful.' } } },
                },
            },
        },
        // Determine whether to return
        {
            condition: {
                id: 1002,
                inlets: [{ id: 1000 }, { id: 800 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 800 }, refer: { key: 'proxy' } },
                                matches: {
                                    text: {
                                        not_equal: { const: { text: '' } },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            call: {
                id: 1003,
                inlets: [{ id: 1002 }, { id: 800 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: {
                                    refer: { endpoint: { id: 800 }, refer: { key: 'proxy' } },
                                },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_proxy_candid,
                                            method: 'withdraw',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = data.item.token_identifier;`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = data.ok;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'text',
            },
        },

        // On -shelf operation
        {
            interaction: {
                id: 1100,
                inlets: [{ id: 899, index: 1 }],
                metadata: {
                    metadata: {
                        choose_tip: {
                            values: {
                                const: {
                                    array: {
                                        ty: 'text',
                                        values: [{ text: 'ICP' }, { text: 'YUKU' }],
                                    },
                                },
                            },
                            style: JSON.stringify({
                                placeholder: 'Choose Token',
                                outputLabel: 'Token',
                            }),
                        },
                    },
                },
            },
        },
        {
            code: {
                id: 1101,
                inlets: [{ id: 1100 }],
                metadata: {
                    data: [{ key: 'index', value: { refer: { endpoint: { id: 1100 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `
                                    if (data.index === 0) {
                                        return {
                                            canister: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
                                            symbol: 'ICP',
                                            decimal: 8,
                                            fee: '10000',
                                        }
                                    }
                                    result = {
                                        canister: 'atbfz-diaaa-aaaaq-aacyq-cai',
                                        symbol: 'YUKU',
                                        decimal: 8,
                                        fee: '1000000',
                                    };
                                `,
                            },
                            js: '',
                        },
                    },
                },
                output: {
                    object: [
                        { key: 'canister', ty: 'text' },
                        { key: 'symbol', ty: 'text' },
                        { key: 'decimal', ty: 'integer' },
                        { key: 'fee', ty: 'text' },
                    ],
                },
            },
        },
        {
            form: {
                id: 1102,
                inlets: [{ id: 1100 }],
                metadata: {
                    style: JSON.stringify({
                        placeholder: 'Input price',
                    }),
                },
                output: 'number',
            },
        },
        {
            code: {
                id: 1103,
                inlets: [{ id: 800 }, { id: 1102 }, { id: 1101 }],
                metadata: {
                    data: [
                        { key: 'price', value: { refer: { endpoint: { id: 1102 } } } },
                        { key: 'token', value: { refer: { endpoint: { id: 1101 } } } },
                        { key: 'item', value: { refer: { endpoint: { id: 800 } } } },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `
                                    result = {
                                        text: \`Sell \${data.item.metadata.name} at \${data.price}\${data.token.symbol}\`,
                                    };
                                `,
                            },
                            js: '',
                        },
                    },
                },
                output: {
                    object: [
                        {
                            key: 'text',
                            ty: 'text',
                        },
                    ],
                },
            },
        },
        // Division standard type
        {
            condition: {
                id: 1199,
                inlets: [{ id: 301 }, { id: 1103 }],
                metadata: {
                    conditions: [
                        // 0
                        {
                            required: {
                                value: { endpoint: { id: 301 }, refer: { key: 'standards' } },
                                matches: {
                                    array: {
                                        contains: { const: { text: 'ICRC7' } },
                                    },
                                },
                            },
                        },
                        // 1
                        {
                            or: [
                                {
                                    required: {
                                        value: {
                                            endpoint: { id: 301 },
                                            refer: { key: 'standards' },
                                        },
                                        matches: {
                                            array: {
                                                contains: { const: { text: 'ENTREPOT' } },
                                            },
                                        },
                                    },
                                },
                                {
                                    required: {
                                        value: {
                                            endpoint: { id: 301 },
                                            refer: { key: 'standards' },
                                        },
                                        matches: {
                                            array: {
                                                contains: { const: { text: 'YUKU-CCC' } },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        // 2
                        {
                            required: {
                                value: { endpoint: { id: 301 }, refer: { key: 'standards' } },
                                matches: {
                                    array: {
                                        contains: { const: { text: 'ORIGYN' } },
                                    },
                                },
                            },
                        },
                        // 3
                        {
                            or: [
                                {
                                    required: {
                                        value: {
                                            endpoint: { id: 301 },
                                            refer: { key: 'standards' },
                                        },
                                        matches: {
                                            array: {
                                                contains: { const: { text: 'ICNAMING' } },
                                            },
                                        },
                                    },
                                },
                                {
                                    required: {
                                        value: {
                                            endpoint: { id: 301 },
                                            refer: { key: 'standards' },
                                        },
                                        matches: {
                                            array: {
                                                contains: { const: { text: 'YUKU-EXT' } },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        },
        // 1200 icrc7
        {
            view: {
                id: 1200,
                inlets: [{ id: 1199 }],
                metadata: {
                    text: {
                        value: { const: { text: 'ICRC7 is not supported now.' } },
                    },
                },
            },
        },
        // 1300 entrepot or yuku-ccc
        // Check if there is an agent first
        {
            condition: {
                id: 1300,
                inlets: [{ id: 1199, index: 1 }, { id: 800 }, { id: 21 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 800 }, refer: { key: 'proxy' } },
                                matches: {
                                    text: {
                                        equal: { const: { text: '' } },
                                    },
                                },
                            },
                        },
                        {
                            required: {
                                value: { endpoint: { id: 800 }, refer: { key: 'proxy' } },
                                matches: {
                                    text: {
                                        equal: {
                                            refer: { endpoint: { id: 21 } },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
        // 0 No proxy step 1 proxy record owner
        {
            call: {
                id: 1301,
                inlets: [{ id: 1300 }, { id: 1103 }, { id: 102 }, { id: 21 }],
                metadata: {
                    ic: {
                        trigger: {
                            click: {
                                text: { refer: { endpoint: { id: 1103 }, refer: { key: 'text' } } },
                            },
                        },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 21 } } },
                                api: {
                                    api: {
                                        single: {
                                            api: 'reserveDeposit: (principal, nat32) -> (variant { err : variant { checkOwnerErr; getBearerErr; unSupportCollectionErr }; ok })',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'collection',
                                                value: { refer: { endpoint: { id: 1 } } },
                                            },
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = [Principal.fromText(data.collection), Number(data.item.token_id)];`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        // step 2 Transfer NFT Pay attention to the distinction between Entrepot and Yuku-CCC
        {
            condition: {
                id: 1310,
                inlets: [{ id: 301 }, { id: 1301 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 301 }, refer: { key: 'standards' } },
                                matches: {
                                    array: {
                                        contains: { const: { text: 'ENTREPOT' } },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
        // entrepot Transfer
        {
            call: {
                id: 1320,
                inlets: [{ id: 1310 }, { id: 102 }, { id: 1 }],
                metadata: {
                    ic: {
                        trigger: {
                            loading: {},
                        },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 1 } } },
                                api: {
                                    api: {
                                        single: {
                                            api: 'transfer: (record { amount : nat; from : variant { address : text; "principal" : principal }; memo : vec nat8; notify : bool; subaccount : opt vec nat8; to : variant { address : text; "principal" : principal }; token : text }) -> (variant { err : variant { CannotNotify : text; InsufficientBalance; InvalidToken : text; Other : text; Rejected; Unauthorized : text }; ok : nat })',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'from',
                                                value: {
                                                    refer: {
                                                        endpoint: { id: 102 },
                                                        refer: { key: 'account_id' },
                                                    },
                                                },
                                            },
                                            {
                                                key: 'to',
                                                value: { refer: { endpoint: { id: 21 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = {
                                                        token: data.item.token_identifier,
                                                        from: { address: data.from },
                                                        to: { principal: Principal.fromText(data.to) },
                                                        subaccount: [],
                                                        memo: [],
                                                        notify: false,
                                                        amount: 1n,
                                                    };`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        // step 3 Notice after transfer
        {
            call: {
                id: 1321,
                inlets: [{ id: 1320 }],
                metadata: {
                    ic: {
                        trigger: {
                            loading: {},
                        },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 21 } } },
                                api: {
                                    api: {
                                        single: {
                                            api: 'fillDeposit: (principal, nat32) -> (variant { err : variant { getBearerErr; noExistDeposit; ownerError; unSupportCollectionErr }; ok })',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'collection',
                                                value: { refer: { endpoint: { id: 1 } } },
                                            },
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = [Principal.fromText(data.collection), Number(data.item.token_id)];`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        // After proxy
        {
            call: {
                id: 1322,
                inlets: [{ id: 1321 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 20 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'sell',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'token',
                                                value: { refer: { endpoint: { id: 1101 } } },
                                            },
                                            {
                                                key: 'price',
                                                value: { refer: { endpoint: { id: 1102 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `
                                                    const price = BigInt(\`\${Math.floor(data.price * Number(OpenNumber.unit(data.token.decimal)))}\`);
                                                    result = {
                                                      tokenIdentifier: data.item.token_identifier,
                                                      token: {
                                                        canister: data.token.canister,
                                                        symbol: data.token.symbol,
                                                        decimal: BigInt(\`\${data.token.decimal}\`),
                                                        fee: BigInt(data.token.fee),
                                                      },
                                                      price: BigInt(price),
                                                    };
                                                    `,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        {
            condition: {
                id: 1323,
                inlets: [{ id: 1322 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1322 } },
                                matches: {
                                    bool: 'is_true',
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 1324,
                inlets: [{ id: 1323 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1325,
                inlets: [{ id: 1323, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing failed.' } },
                    },
                },
            },
        },
        // yuku-ccc Transfer
        {
            call: {
                id: 1330,
                inlets: [{ id: 1310, index: 1 }, { id: 102 }, { id: 1 }],
                metadata: {
                    ic: {
                        trigger: {
                            loading: {},
                        },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 1 } } },
                                api: {
                                    api: {
                                        single: {
                                            api: 'transferFrom: (principal, principal, nat) -> (variant { err : variant { ListOnMarketPlace; NotAllowTransferToSelf; NotOwnerOrNotApprove; Other }; ok : nat })',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'from',
                                                value: {
                                                    refer: {
                                                        endpoint: { id: 102 },
                                                        refer: { key: 'owner' },
                                                    },
                                                },
                                            },
                                            {
                                                key: 'to',
                                                value: { refer: { endpoint: { id: 21 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = [Principal.fromText(data.from), Principal.fromText(data.to), BigInt(data.item.token_id)];`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        // step 3 Notice after transfer
        {
            call: {
                id: 1331,
                inlets: [{ id: 1330 }],
                metadata: {
                    ic: {
                        trigger: {
                            loading: {},
                        },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 21 } } },
                                api: {
                                    api: {
                                        single: {
                                            api: 'fillDeposit: (principal, nat32) -> (variant { err : variant { getBearerErr; noExistDeposit; ownerError; unSupportCollectionErr }; ok })',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'collection',
                                                value: { refer: { endpoint: { id: 1 } } },
                                            },
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = [Principal.fromText(data.collection), Number(data.item.token_id)];`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        // After proxy
        {
            call: {
                id: 1332,
                inlets: [{ id: 1331 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 20 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'sell',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'token',
                                                value: { refer: { endpoint: { id: 1101 } } },
                                            },
                                            {
                                                key: 'price',
                                                value: { refer: { endpoint: { id: 1102 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `
                                                    const price = BigInt(\`\${Math.floor(data.price * Number(OpenNumber.unit(data.token.decimal)))}\`);
                                                    result = {
                                                      tokenIdentifier: data.item.token_identifier,
                                                      token: {
                                                        canister: data.token.canister,
                                                        symbol: data.token.symbol,
                                                        decimal: BigInt(\`\${data.token.decimal}\`),
                                                        fee: BigInt(data.token.fee),
                                                      },
                                                      price: BigInt(price),
                                                    };
                                                    `,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },

        {
            condition: {
                id: 1333,
                inlets: [{ id: 1332 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1332 } },
                                matches: {
                                    bool: 'is_true',
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 1334,
                inlets: [{ id: 1333 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1335,
                inlets: [{ id: 1333, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing failed.' } },
                    },
                },
            },
        },
        // 1 Have already agent
        {
            call: {
                id: 1370,
                inlets: [{ id: 1300, index: 1 }, { id: 1101 }, { id: 1102 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 20 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'sell',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'token',
                                                value: { refer: { endpoint: { id: 1101 } } },
                                            },
                                            {
                                                key: 'price',
                                                value: { refer: { endpoint: { id: 1102 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `
                                                    const price = BigInt(\`\${Math.floor(data.price * Number(OpenNumber.unit(data.token.decimal)))}\`);
                                                    result = {
                                                      tokenIdentifier: data.item.token_identifier,
                                                      token: {
                                                        canister: data.token.canister,
                                                        symbol: data.token.symbol,
                                                        decimal: BigInt(\`\${data.token.decimal}\`),
                                                        fee: BigInt(data.token.fee),
                                                      },
                                                      price: BigInt(price),
                                                    };
                                                    `,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        {
            condition: {
                id: 1371,
                inlets: [{ id: 1370 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1370 } },
                                matches: {
                                    bool: 'is_true',
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 1372,
                inlets: [{ id: 1371 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1373,
                inlets: [{ id: 1371, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing failed.' } },
                    },
                },
            },
        },
        // 2 Error
        {
            view: {
                id: 1399,
                inlets: [{ id: 1300, index: 2 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Unknown NFT holding canister.' } },
                    },
                },
            },
        },

        // 1400 origyn
        {
            view: {
                id: 1400,
                inlets: [{ id: 1199, index: 2 }],
                metadata: {
                    text: {
                        value: { const: { text: 'ORIGYN is not supported now.' } },
                    },
                },
            },
        },
        // 1500 icnaming or yuku-ext
        {
            call: {
                id: 1500,
                inlets: [{ id: 1199, index: 3 }, { id: 102 }, { id: 1103 }],
                metadata: {
                    ic: {
                        trigger: {
                            click: {
                                text: { refer: { endpoint: { id: 1103 }, refer: { key: 'text' } } },
                            },
                        },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 1 } } },
                                api: {
                                    api: {
                                        single: {
                                            api: 'approve: (record { allowance : nat; spender : principal; subaccount : opt vec nat8; token : text }) -> (bool)',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'spender',
                                                value: { refer: { endpoint: { id: 20 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = {
                                                      token: data.item.token_identifier,
                                                      spender: Principal.fromText(data.spender),
                                                      subaccount: [],
                                                      allowance: 1n
                                                    };`,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        {
            condition: {
                id: 1501,
                inlets: [{ id: 1500 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1500 } },
                                matches: {
                                    bool: 'is_true',
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 1502,
                inlets: [{ id: 1501, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Approve failed.' } },
                    },
                },
            },
        },
        {
            call: {
                id: 1503,
                inlets: [{ id: 1501 }, { id: 1101 }, { id: 1102 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 20 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'sell',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'token',
                                                value: { refer: { endpoint: { id: 1101 } } },
                                            },
                                            {
                                                key: 'price',
                                                value: { refer: { endpoint: { id: 1102 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `
                                                    const price = BigInt(\`\${Math.floor(data.price * Number(OpenNumber.unit(data.token.decimal)))}\`);
                                                    result = {
                                                      tokenIdentifier: data.item.token_identifier,
                                                      token: {
                                                        canister: data.token.canister,
                                                        symbol: data.token.symbol,
                                                        decimal: BigInt(\`\${data.token.decimal}\`),
                                                        fee: BigInt(data.token.fee),
                                                      },
                                                      price: BigInt(price),
                                                    };
                                                    `,
                                                },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                    if (!data.ok) throw new Error(Object.keys(data.err)[0]);
                                                    result = true;
                                                `,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                output: 'bool',
            },
        },
        {
            condition: {
                id: 1504,
                inlets: [{ id: 1503 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1503 } },
                                matches: {
                                    bool: 'is_true',
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 1505,
                inlets: [{ id: 1504 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1506,
                inlets: [{ id: 1504, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Listing failed.' } },
                    },
                },
            },
        },
    ],
};
