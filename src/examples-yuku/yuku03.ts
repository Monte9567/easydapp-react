import { LinkComponent } from '@jellypack/runtime/lib/model/components';
import { candid as yuku_core_candid } from '../examples/example03_candid';
import { candid as yuku_proxy_candid } from './yuku_proxy_candid';

export const app_id = 398636118853077;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Yuku: Transfer NFTs';
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
        // Jar
        {
            const: {
                id: 20,
                metadata: {
                    value: { text: 'udtw4-baaaa-aaaah-abc3q-cai' },
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
                        trigger: { loading: { alive: 60000 } },
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
                                alive: 86400,
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
                                        values: data.items.map(d => d.metadata.name)
                                    };
                                `,
                            },
                            js: '',
                        },
                    },
                },
                output: {
                    object: [{ key: 'values', ty: { array: 'text' } }],
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
            interaction: {
                id: 600,
                inlets: [{ id: 402 }, { id: 510, index: 1 }],
                metadata: {
                    metadata: {
                        choose_tip: {
                            values: { refer: { endpoint: { id: 402 }, refer: { key: 'values' } } },
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
        // Transfer operation
        {
            form: {
                id: 1102,
                inlets: [{ id: 800 }],
                metadata: {
                    validate: {
                        code: {
                            code: {
                                code: {
                                    code: `
                                        try {
                                            Principal.fromText(data);
                                            return '';
                                        } catch(e) {
                                            return 'Invalid principal';
                                        }
                                    `,
                                },
                                js: '',
                            },
                        },
                    },
                    style: JSON.stringify({
                        placeholder: 'Principal',
                    }),
                },
                output: 'text',
            },
        },
        {
            condition: {
                id: 1103,
                inlets: [{ id: 102 }, { id: 1102 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 102 }, refer: { key: 'owner' } },
                                matches: {
                                    text: {
                                        not_equal: { refer: { endpoint: { id: 1102 } } },
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
                id: 1104,
                inlets: [{ id: 1103, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Can not transfer to yourself.' } },
                    },
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
                        // 4
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
                inlets: [{ id: 1199, index: 1 }, { id: 800 }],
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
        // 0 If you have an agent, you need to retrieve
        {
            call: {
                id: 1301,
                inlets: [{ id: 1300 }, { id: 800 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { const: { text: 'Transfer' } } } },
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
        // step 2 Drive NFT Pay attention to the distinction between Entrepot and Yuku-CCC
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
                inlets: [{ id: 1310 }, { id: 102 }, { id: 1 }, { id: 1102 }],
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
                                                value: { refer: { endpoint: { id: 1102 } } },
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
        // Notice after transfer
        {
            condition: {
                id: 1323,
                inlets: [{ id: 1320 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1320 } },
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
                        value: { const: { text: 'Transfer successful.' } },
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
                        value: { const: { text: 'Transfer failed.' } },
                    },
                },
            },
        },
        // yuku-ccc Transfer
        {
            call: {
                id: 1330,
                inlets: [{ id: 1310, index: 1 }, { id: 102 }, { id: 1 }, { id: 1102 }],
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
                                                value: { refer: { endpoint: { id: 1102 } } },
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
        // Notice after transfer
        {
            condition: {
                id: 1333,
                inlets: [{ id: 1330 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1330 } },
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
                        value: { const: { text: 'Transfer successful.' } },
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
                        value: { const: { text: 'Transfer failed.' } },
                    },
                },
            },
        },
        // 1 No agent
        {
            condition: {
                id: 1360,
                inlets: [{ id: 301 }, { id: 1300, index: 1 }],
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
                id: 1370,
                inlets: [{ id: 1360 }, { id: 102 }, { id: 1 }, { id: 1102 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { const: { text: 'Transfer' } } } },
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
                                                value: { refer: { endpoint: { id: 1102 } } },
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
        // Notice after transfer
        {
            condition: {
                id: 1373,
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
                id: 1374,
                inlets: [{ id: 1373 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1375,
                inlets: [{ id: 1373, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer failed.' } },
                    },
                },
            },
        },
        // yuku-ccc Transfer
        {
            call: {
                id: 1380,
                inlets: [{ id: 1360, index: 1 }, { id: 102 }, { id: 1 }, { id: 1102 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { const: { text: 'Transfer' } } } },
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
                                                value: { refer: { endpoint: { id: 1102 } } },
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
        // Notice after transfer
        {
            condition: {
                id: 1383,
                inlets: [{ id: 1380 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1380 } },
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
                id: 1384,
                inlets: [{ id: 1383 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1385,
                inlets: [{ id: 1383, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer failed.' } },
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
        // 1500 icnaming
        {
            call: {
                id: 1500,
                inlets: [{ id: 1199, index: 3 }, { id: 102 }, { id: 1 }, { id: 1102 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { const: { text: 'Transfer' } } } },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 1 } } },
                                api: {
                                    api: {
                                        single: {
                                            api: 'ext_transfer: (record { amount : nat; from : variant { address : text; "principal" : principal }; memo : vec nat8; notify : bool; subaccount : opt vec nat8; to : variant { address : text; "principal" : principal }; token : text }) -> (variant { Err : variant { CannotNotify : text; InsufficientBalance; InvalidToken : text; Other : text; Rejected; Unauthorized : text }; Ok : nat })',
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
                                                value: { refer: { endpoint: { id: 1102 } } },
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
        // Notice after transfer
        {
            condition: {
                id: 1583,
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
                id: 1584,
                inlets: [{ id: 1583 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1585,
                inlets: [{ id: 1583, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer failed.' } },
                    },
                },
            },
        },
        // 1600 yuku-ext
        {
            call: {
                id: 1600,
                inlets: [{ id: 1199, index: 4 }, { id: 102 }, { id: 1 }, { id: 1102 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { const: { text: 'Transfer' } } } },
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
                                                value: { refer: { endpoint: { id: 1102 } } },
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
        // Notice after transfer
        {
            condition: {
                id: 1673,
                inlets: [{ id: 1600 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1600 } },
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
                id: 1674,
                inlets: [{ id: 1673 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer successful.' } },
                    },
                },
            },
        },
        {
            view: {
                id: 1675,
                inlets: [{ id: 1673, index: 1 }],
                metadata: {
                    text: {
                        value: { const: { text: 'Transfer failed.' } },
                    },
                },
            },
        },
    ],
};
