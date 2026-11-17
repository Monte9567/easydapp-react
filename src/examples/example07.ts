import { LinkComponent } from '@jellypack/runtime/lib/model/components';

export const app_id = 50611125269931100;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Example 7: temp';
export const icon = 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png';
const erc20_abi =
    '[{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
const swap_abi =
    '[{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"}]';

const example01: LinkComponent[] = [
    {
        view: {
            id: 91,
            metadata: { text: { value: { const: { text: 'Swap Info' } } } },
        },
    },
    {
        call: {
            id: 93,
            inlets: [{ id: 94 }],
            metadata: {
                http: {
                    trigger: { click: { text: { const: { text: 'Get Swap Pairs' } } } },
                    identity: 94,
                    url: {
                        const: {
                            text: 'https://gateway.thegraph.com/api/9cbc9f73a44f89d08fda87616ff4e44b/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum',
                        },
                    },
                    method: 'POST',
                    body: {
                        plain: {
                            data: [
                                {
                                    name: 'query',
                                    value: {
                                        const: {
                                            text: '{\n  pairs(where: {token0_: {id: "0xdac17f958d2ee523a2206206994597c13d831ec7", symbol: "USDT"}}) {\n    id\n    token0Price\n   token1Price\n    token0 {\n      id\n      symbol\n    decimals\n}\n    token1 {\n      id\n      symbol\n    decimals\n}\n  }\n}',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    parsed: 'json',
                    post: {
                        code: {
                            code: {
                                code: `if (data.data.pairs) {
                                                result = data.data.pairs.map(d => ({
                                                    pair_id: d.id,
                                                    token0_price: d.token0Price,
                                                    token1_price: d.token1Price,
                                                    token0_id: d.token0?.id ?? '',
                                                    token1_id: d.token1?.id ?? '',
                                                    token0_symbol: d.token0?.symbol ?? '',
                                                    token1_symbol: d.token1?.symbol ?? '',
                                                    token0_decimals: d.token0?.decimals ?? '',
                                                    token1_decimals: d.token1?.decimals ?? ''
                                                }));
                                            } else {
                                                result = [];
                                            }`,
                            },
                            js: '',
                        },
                    },
                },
            },
            output: {
                array: {
                    object: [
                        { key: 'pair_id', ty: 'text' },
                        { key: 'token0_price', ty: 'text' },
                        { key: 'token1_price', ty: 'text' },
                        { key: 'token0_id', ty: 'text' },
                        { key: 'token1_id', ty: 'text' },
                        { key: 'token0_symbol', ty: 'text' },
                        { key: 'token1_symbol', ty: 'text' },
                        { key: 'token0_decimals', ty: 'text' },
                        { key: 'token1_decimals', ty: 'text' },
                    ],
                },
            },
        },
    },
    { identity: { id: 94, metadata: { metadata: { http: {} } } } },
    {
        code: {
            id: 95,
            inlets: [{ id: 93 }],
            metadata: {
                data: [{ key: 'pair', value: { refer: { endpoint: { id: 93 } } } }],
                code: {
                    code: {
                        code: {
                            code: `
                                result = {
                                    headers: ['PairId', 'Token0 symbol', 'Token1 symbol', 'Token0 price', 'Token0 decimals', 'Token0 Address', 'Token1 price', 'Token1 decimals', 'Token1 Address'],
                                    rows: data.pair.map(item => [
                                                    item.pair_id.substring(0, 2) + '...' + item.pair_id.slice(-4) ?? '',
                                                    item.token0_symbol ?? '',
                                                    item.token1_symbol ?? '',
                                                    parseFloat(item.token0_price).toFixed(4) ?? '',
                                                    item.token0_decimals ?? '',
                                                    item.token0_id ?? '',
                                                    parseFloat(item.token0_price).toFixed(4) ?? '',
                                                    item.token1_decimals ?? '',
                                                    item.token1_id ?? ''
                                                ]),
                                }
                                `,
                        },
                        js: '',
                    },
                },
            },
            output: {
                object: [
                    { key: 'headers', ty: { array: 'text' } },
                    { key: 'rows', ty: { array: { array: 'text' } } },
                ],
            },
        },
    },
    {
        view: {
            id: 96,
            inlets: [{ id: 95 }],
            metadata: { table: { value: { refer: { endpoint: { id: 95 } } } } },
        },
    },
    {
        code: {
            id: 97,
            inlets: [{ id: 93 }],
            metadata: {
                data: [{ key: 'pair', value: { refer: { endpoint: { id: 93 } } } }],
                code: {
                    code: {
                        code: {
                            code: `
                                result = {
                                    values: data.pair.map(d => d.token0_symbol + '/' + d.token1_symbol ),
                                    tips: data.pair.map(d => Number(d.token1_price).toFixed(2)),
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
    {
        interaction: {
            id: 98,
            inlets: [{ id: 97 }],
            metadata: {
                metadata: {
                    choose_tip: {
                        values: { refer: { endpoint: { id: 97 }, refer: { key: 'values' } } },
                        tips: { refer: { endpoint: { id: 97 }, refer: { key: 'tips' } } },
                        style: JSON.stringify({
                            placeholder: 'Choose Pair',
                            outputLabel: 'Pair',
                        }),
                    },
                },
            },
        },
    },
    {
        code: {
            id: 99,
            inlets: [{ id: 93 }, { id: 98 }],
            metadata: {
                data: [
                    { key: 'items', value: { refer: { endpoint: { id: 93 } } } },
                    { key: 'index', value: { refer: { endpoint: { id: 98 } } } },
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
                    { key: 'pair_id', ty: 'text' },
                    { key: 'token0_price', ty: 'text' },
                    { key: 'token1_price', ty: 'text' },
                    { key: 'token0_id', ty: 'text' },
                    { key: 'token1_id', ty: 'text' },
                    { key: 'token0_symbol', ty: 'text' },
                    { key: 'token1_symbol', ty: 'text' },
                    { key: 'token0_decimals', ty: 'text' },
                    { key: 'token1_decimals', ty: 'text' },
                ],
            },
        },
    },
    {
        code: {
            id: 9901,
            inlets: [{ id: 99 }],
            metadata: {
                data: [{ key: 'item', value: { refer: { endpoint: { id: 99 } } } }],
                code: {
                    code: {
                        code: {
                            code: `result = data.item.token0_symbol + ' = ' + data.item.token0_id;`,
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
            id: 9902,
            inlets: [{ id: 99 }],
            metadata: {
                data: [{ key: 'item', value: { refer: { endpoint: { id: 99 } } } }],
                code: {
                    code: {
                        code: {
                            code: `result = data.item.token1_symbol + ' = ' + data.item.token1_id;`,
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
            id: 9903,
            inlets: [{ id: 9901 }],
            metadata: { text: { value: { const: { text: 'UNISWAP_V2:' } } } },
        },
    },
    {
        view: {
            id: 9904,
            inlets: [{ id: 9901 }],
            metadata: {
                text: {
                    value: {
                        const: {
                            text: 'ROUTER_ADDRESS = 0x7a250d5630b4cf539739df2c5dacabfae8677d94',
                        },
                    },
                },
            },
        },
    },
    {
        view: {
            id: 9905,
            inlets: [{ id: 9901 }],
            metadata: { text: { value: { refer: { endpoint: { id: 9901 } } } } },
        },
    },
    {
        view: {
            id: 9906,
            inlets: [{ id: 9902 }],
            metadata: { text: { value: { refer: { endpoint: { id: 9902 } } } } },
        },
    },
];

const example02: LinkComponent[] = [
    {
        view: {
            id: 101,
            metadata: {
                text: { value: { const: { text: '1. Approve USDT' } } },
            },
        },
    },
    {
        call: {
            id: 102,
            inlets: [{ id: 2 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Approve USDT' } } } },
                    identity: 2,
                    chain: 'ethereum',
                    action: {
                        transaction: {
                            contract: {
                                const: { text: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
                            },
                            // pay_value: { const: { text: '1000000000000' } },
                            // gas_limit: { const: { integer: 70000 } },
                            // gas_price: { const: { text: '1000000000000' } },
                            // nonce: { const: { integer: 0 } },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(erc20_abi).find(
                                                (item: any) => item.name === 'approve',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = [
                                                    '0x7a250d5630b4cf539739df2c5dacabfae8677d94',
                                                    40000000n
                                                ];`,
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
            output: 'text',
        },
    },
    {
        view: {
            id: 103,
            inlets: [{ id: 102 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 102 } } } },
            },
        },
    },
];

const example03: LinkComponent[] = [
    {
        view: {
            id: 201,
            metadata: {
                text: { value: { const: { text: '2. Approve ZRX' } } },
            },
        },
    },
    {
        call: {
            id: 202,
            inlets: [{ id: 2 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Approve ZRX' } } } },
                    identity: 2,
                    chain: 'ethereum',
                    action: {
                        transaction: {
                            contract: {
                                const: { text: '0xE41d2489571d322189246DaFA5ebDe1F4699F498' },
                            },
                            // pay_value: { const: { text: '1000000000000' } },
                            // gas_limit: { const: { integer: 70000 } },
                            // gas_price: { const: { text: '1000000000000' } },
                            // nonce: { const: { integer: 0 } },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(erc20_abi).find(
                                                (item: any) => item.name === 'approve',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = [
                                                    '0x7a250d5630b4cf539739df2c5dacabfae8677d94',
                                                    4000000000000000000n
                                                ];`,
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
            output: 'text',
        },
    },
    {
        view: {
            id: 203,
            inlets: [{ id: 202 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 202 } } } },
            },
        },
    },
];

const example04: LinkComponent[] = [
    {
        view: {
            id: 401,
            metadata: { text: { value: { const: { text: '3. Enter you sell USDT amount:' } } } },
        },
    },
    { form: { id: 402, output: 'text' } },
    {
        code: {
            id: 403,
            inlets: [{ id: 402 }],
            metadata: {
                data: [{ key: 'amount', value: { refer: { endpoint: { id: 402 } } } }],
                code: {
                    code: {
                        code: {
                            code: 'result = `The USDT you are going to sell is: ${data.amount}`;',
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
            id: 404,
            inlets: [{ id: 403 }],
            metadata: { text: { value: { refer: { endpoint: { id: 403 } } } } },
        },
    },
    {
        call: {
            id: 405,
            inlets: [{ id: 402 }, { id: 1 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Call' } } } },
                    identity: 1,
                    chain: 'ethereum',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(swap_abi).find(
                                                (item: any) => item.name === 'getAmountsOut',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    data: [
                                        {
                                            key: 'amount',
                                            value: { refer: { endpoint: { id: 402 } } },
                                        },
                                    ],
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = [
                                                        BigInt(Number(data.amount) * 1e6),
                                                        ['0xdac17f958d2ee523a2206206994597c13d831ec7', '0xE41d2489571d322189246DaFA5ebDe1F4699F498']
                                                    ];`,
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
                                            code: `result = 'You will receive ZRX for: ' + (Number(data[1]) / 1e18).toString();`,
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
            id: 406,
            inlets: [{ id: 405 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 405 } } } },
            },
        },
    },
];

const example05: LinkComponent[] = [
    {
        view: {
            id: 501,
            metadata: {
                text: { value: { const: { text: '4. Swap USDT / ZRX' } } },
            },
        },
    },
    {
        call: {
            id: 502,
            inlets: [{ id: 2 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Swap' } } } },
                    identity: 2,
                    chain: 'ethereum',
                    action: {
                        transaction: {
                            contract: {
                                const: { text: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' },
                            },
                            gas_limit: { const: { integer: 1400000 } },
                            // pay_value: { const: { text: '1000000000000' } },
                            gas_price: { const: { text: '2000000000000' } },
                            // nonce: { const: { integer: 0 } },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(swap_abi).find(
                                                (item: any) =>
                                                    item.name === 'swapExactTokensForTokens',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `
                                                const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
                                                result = [
                                                    20000000n,
                                                    360000000000000000000n,
                                                    ['0xdac17f958d2ee523a2206206994597c13d831ec7', '0xE41d2489571d322189246DaFA5ebDe1F4699F498'],
                                                    '0xF89b54e6FD327C522b54951B89F5da02d3aFAF4f',
                                                    deadline
                                                ];`,
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
            output: 'text',
        },
    },
    {
        view: {
            id: 503,
            inlets: [{ id: 502 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 502 } } } },
            },
        },
    },
];

export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
        {
            identity: {
                id: 1,
                metadata: {
                    metadata: {
                        evm: {
                            chain: 'ethereum',
                        },
                    },
                },
            },
        },
        {
            identity: {
                id: 2,
                metadata: {
                    metadata: {
                        evm: {
                            chain: 'ethereum',
                            includes: [{ any: {} }],
                            connect: { const: { text: 'Connect Wallet' } },
                        },
                    },
                },
            },
        },
        ...example01,
        ...example02,
        ...example03,
        ...example04,
        ...example05,
    ],
};
