import { LinkComponent } from '@jellypack/runtime/lib/model/components';
import { candid as yuku_core_candid } from '../examples/example03_candid';

export const app_id = 3083495935246492;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Yuku: Buy NFTs';
export const icon = 'https://file.easydapp.ai/image/dQx8Sn6508ff22c6fc.jpeg';
export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
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
        {
            const: {
                id: 3,
                metadata: {
                    value: { text: 'udtw4-baaaa-aaaah-abc3q-cai' },
                },
                output: 'text',
            },
        },
        {
            identity: {
                id: 100,
                metadata: { metadata: { http: {} } },
            },
        },
        {
            identity: {
                id: 101,
                metadata: { metadata: { ic: {} } },
            },
        },
        {
            identity: {
                id: 102,
                inlets: [{ id: 800 }],
                metadata: { metadata: { ic: { includes: [{ any: {} }] } } },
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
                        trigger: { loading: { alive: 3600000 } },
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
                                code: `result = \`https://yuku-chain-ic-proxy.yuku.app/durable/nft/owner/prod?delay=86400000&collections=\${data.collection}\``,
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
                                alive: 86400000,
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
                                        const tokens: number[] = [];
                                        for (let i = 0; i < data.data[0].tokens.length; i++) {
                                            const [_owner, ids] = data.data[0].tokens[i];
                                            tokens.push(...ids.map(id => parseInt(id)));
                                        }
                                        tokens.sort((a, b) => a - b);
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
                        { key: 'tokens', ty: { array: 'integer' } },
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
        // IC obtain information on the shelf
        {
            call: {
                id: 400,
                inlets: [{ id: 1 }, { id: 101 }, { id: 301 }, { id: 3 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 101,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 3 } } },
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
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = [Principal.fromText(data.collection), data.tokens];`,
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
                                                code: `result = data.filter(d => d.listing.fixed).map(d => {
                                                    const fixed = d.listing.fixed;
                                                    return {
                                                        token_id: \`\${OpenIc.ext_identifier2index(fixed.tokenIdentifier)}\`,
                                                        token_identifier: fixed.tokenIdentifier,
                                                        seller: fixed.seller.toText(),
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
        // Conditional judgment whether there is information on the shelf
        {
            condition: {
                id: 500,
                inlets: [{ id: 401 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 401 } },
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
        {
            view: {
                id: 510,
                inlets: [{ id: 500 }],
                metadata: {
                    text: {
                        value: { const: { text: 'No NFT for sale' } },
                    },
                },
            },
        },
        // Determine whether to choose
        {
            condition: {
                id: 700,
                inlets: [{ id: 600 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 600 } },
                                matches: {
                                    integer: 'null',
                                },
                            },
                        },
                    ],
                },
            },
        },
        // Show the information on the shelves has not been selected yet
        {
            view: {
                id: 701,
                inlets: [{ id: 700 }, { id: 201 }, { id: 2 }],
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
                id: 702,
                inlets: [{ id: 700 }, { id: 201 }],
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 201 }, refer: { key: 'name' } } },
                    },
                },
            },
        },
        {
            view: {
                id: 703,
                inlets: [{ id: 700 }, { id: 201 }],
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
                id: 704,
                inlets: [{ id: 700 }, { id: 201 }],
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
                id: 705,
                inlets: [{ id: 700 }, { id: 704 }, { id: 201 }],
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
                id: 706,
                inlets: [{ id: 705 }],
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 705 } } },
                    },
                },
            },
        },
        // Display the information on the shelves and choose something
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
            code: {
                id: 900,
                inlets: [{ id: 800 }],
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
                inlets: [{ id: 402 }, { id: 500, index: 1 }],
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
                inlets: [{ id: 700, index: 1 }, { id: 401 }, { id: 600 }],
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
            condition: {
                id: 1000,
                inlets: [{ id: 102 }, { id: 800 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 800 }, refer: { key: 'seller' } },
                                matches: {
                                    text: {
                                        not_equal: {
                                            refer: {
                                                endpoint: { id: 102 },
                                                refer: { key: 'owner' },
                                            },
                                        },
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
                id: 1001,
                inlets: [{ id: 600 }, { id: 1000, index: 1 }],
                metadata: {
                    text: { value: { const: { text: 'Can not buy yourself NFT.' } } },
                },
            },
        },
        // Balance inspection
        {
            call: {
                id: 1100,
                inlets: [{ id: 800 }, { id: 102 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: {
                                    refer: {
                                        endpoint: { id: 800 },
                                        refer: { key: 'token', refer: { key: 'canister' } },
                                    },
                                },
                                api: {
                                    api: {
                                        single: {
                                            api: 'icrc1_balance_of: (record { owner : principal; subaccount : opt vec nat8 }) -> (nat) query',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'owner',
                                                value: {
                                                    refer: {
                                                        endpoint: { id: 102 },
                                                        refer: { key: 'owner' },
                                                    },
                                                },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = { owner: Principal.fromText(data.owner), subaccount: [] }`,
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
                                                code: `result = \`\${data}\``,
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
            code: {
                id: 1101,
                inlets: [{ id: 800 }, { id: 1100 }],
                metadata: {
                    data: [
                        { key: 'item', value: { refer: { endpoint: { id: 800 } } } },
                        { key: 'balance', value: { refer: { endpoint: { id: 1100 } } } },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `result = (BigInt(data.item.price) + BigInt(data.item.token.fee) * 2n) <= BigInt(data.balance);`,
                            },
                            js: '',
                        },
                    },
                },
                output: 'bool',
            },
        },
        {
            condition: {
                id: 1102,
                inlets: [{ id: 1101 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1101 } },
                                matches: { bool: 'is_true' },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 1103,
                inlets: [{ id: 1101 }, { id: 1102, index: 1 }],
                metadata: {
                    text: { value: { const: { text: 'Insufficient balance.' } } },
                },
            },
        },
        // Check whether to get on the shelves again, but also the trigger button to trigger the purchase
        {
            code: {
                id: 1199,
                inlets: [{ id: 800 }, { id: 1102 }],
                metadata: {
                    data: [{ key: 'item', value: { refer: { endpoint: { id: 800 } } } }],
                    code: {
                        code: {
                            code: {
                                code: `result = \`Buy \${data.item.metadata.name}\`;`,
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
                id: 1200,
                inlets: [{ id: 800 }, { id: 102 }, { id: 1199 }, { id: 3 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { refer: { endpoint: { id: 1199 } } } } },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 3 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'nftInfos',
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
                                                    code: `result = [data.item.token_identifier];`,
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
                                                    const d = data[0];
                                                    if (!d || !d.listing.fixed) result = false;
                                                    else {
                                                        const fixed = d.listing.fixed;
                                                        const got = {
                                                            token_id: \`\${OpenIc.ext_identifier2index(fixed.tokenIdentifier)}\`,
                                                            token_identifier: fixed.tokenIdentifier,
                                                            seller: fixed.seller.toText(),
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
                                                        result =
                                                            got.token_id === data_of_args.item.token_id
                                                            && got.token_identifier === data_of_args.item.token_identifier
                                                            && got.seller === data_of_args.item.seller
                                                            && got.token.canister === data_of_args.item.token.canister
                                                            && got.price === data_of_args.item.price;
                                                    }
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
                id: 1300,
                inlets: [{ id: 1200 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1200 } },
                                matches: { bool: 'is_true' },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 1301,
                inlets: [{ id: 1300, index: 1 }],
                metadata: {
                    text: {
                        value: {
                            const: {
                                text: 'This NFT is not available for sale or the listing information has changed.',
                            },
                        },
                    },
                },
            },
        },
        // Do not judge standards for purchasing, because OGY will not get information on the shelves
        // Create an order
        {
            call: {
                id: 1400,
                inlets: [{ id: 1300 }, { id: 102 }, { id: 800 }, { id: 3 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 3 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'buyNow',
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
                                                    result = {
                                                        memo: \`\${data.ok.memo}\`,
                                                        token: {
                                                            canister: data.ok.token.canister,
                                                            symbol: data.ok.token.symbol,
                                                            decimal: Number(\`\${data.ok.token.decimal}\`),
                                                            fee: \`\${data.ok.token.fee}\`,
                                                        }
                                                    };
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
                output: {
                    object: [
                        {
                            key: 'memo',
                            ty: 'text',
                        },
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
                    ],
                },
            },
        },
        // Payment to obtain transfer height
        {
            call: {
                id: 1401,
                inlets: [{ id: 1400 }, { id: 800 }, { id: 102 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: {
                                    refer: {
                                        endpoint: { id: 1400 },
                                        refer: { key: 'token', refer: { key: 'canister' } },
                                    },
                                },
                                api: {
                                    api: {
                                        single: {
                                            api: 'icrc1_transfer: (record { amount : nat; created_at_time : opt nat64; fee : opt nat; from_subaccount : opt vec nat8; memo : opt vec nat8; to : record { owner : principal; subaccount : opt vec nat8 } }) -> (variant { Err : variant { BadBurn : record { min_burn_amount : nat }; BadFee : record { expected_fee : nat }; CreatedInFuture : record { ledger_time : nat64 }; Duplicate : record { duplicate_of : nat }; GenericError : record { error_code : nat; message : text }; InsufficientFunds : record { balance : nat }; TemporarilyUnavailable; TooOld }; Ok : nat })',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'order',
                                                value: { refer: { endpoint: { id: 1400 } } },
                                            },
                                            {
                                                key: 'item',
                                                value: { refer: { endpoint: { id: 800 } } },
                                            },
                                            {
                                                key: 'to',
                                                value: { refer: { endpoint: { id: 3 } } },
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
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `
                                                        const principalToSubAccount = (principal: Principal) => {
                                                            const bytes = principal.toUint8Array();
                                                            const subAccount = new Uint8Array(32);
                                                            subAccount[0] = bytes.length;
                                                            subAccount.set(bytes, 1);
                                                            return subAccount;
                                                        };
                                                        result = {
                                                            from_subaccount: [],
                                                            to: {
                                                                owner: Principal.fromText(data.to),
                                                                subaccount: [principalToSubAccount(Principal.fromText(data.from))]
                                                            },
                                                            amount: BigInt(data.item.price) + BigInt(data.order.token.fee),
                                                            fee: [],
                                                            memo: [],
                                                            created_at_time: []
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
                                                    if (!data.Ok) throw new Error(Object.keys(data.Err)[0]);
                                                    result = \`\${data.Ok}\`;
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
        // Submit an order
        {
            call: {
                id: 1402,
                inlets: [{ id: 1401 }, { id: 102 }, { id: 3 }],
                metadata: {
                    ic: {
                        trigger: { loading: {} },
                        identity: 102,
                        action: {
                            call: {
                                canister_id: { refer: { endpoint: { id: 3 } } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: yuku_core_candid,
                                            method: 'verifyTxWithMemo2',
                                        },
                                    },
                                },
                                arg: {
                                    code: {
                                        data: [
                                            {
                                                key: 'order',
                                                value: { refer: { endpoint: { id: 1400 } } },
                                            },
                                        ],
                                        code: {
                                            code: {
                                                code: {
                                                    code: `result = [
                                                        BigInt(data.order.memo),
                                                        {
                                                            canister: data.order.token.canister,
                                                            symbol: data.order.token.symbol,
                                                            decimal: BigInt(\`\${data.order.token.decimal}\`),
                                                            fee: BigInt(data.order.token.fee),
                                                        }
                                                    ]`,
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
        // Condition judgment purchase success prompt
        {
            condition: {
                id: 1403,
                inlets: [{ id: 1402 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 1402 } },
                                matches: {
                                    text: 'not_null',
                                },
                            },
                        },
                    ],
                },
            },
        },
        // Successfully display
        {
            view: {
                id: 1404,
                inlets: [{ id: 1403 }],
                metadata: {
                    bool: {
                        value: { const: { bool: true } },
                    },
                },
            },
        },
    ],
};
