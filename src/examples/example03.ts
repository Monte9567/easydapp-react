import { LinkComponent } from '@jellypack/runtime/lib/model/components';
import { candid } from './example03_candid';

export const app_id = 4586226583132258;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Example 3: call code view(table)';
export const icon = 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png';
export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
        {
            call: {
                id: 1,
                inlets: [{ id: 2 }],
                metadata: {
                    http: {
                        trigger: { loading: {} },
                        identity: 2,
                        url: { const: { text: 'https://stat.yuku.app/api/collections' } },
                        method: 'POST',
                        body: {
                            plain: {
                                data: [{ name: 'limit', value: { const: { integer: 1000 } } }],
                            },
                        },
                        parsed: 'json',
                        post: {
                            code: {
                                code: {
                                    code: `if (data.code === 200) {
    result = data.data.data.map(d => ({
        canister_id: d.canister,
        name: d.name ?? '',
        standard: d.standard ?? '',
        floor_price: d.floor_price ?? '',
        volume: d.volume ?? '',
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
                            { key: 'canister_id', ty: 'text' },
                            { key: 'name', ty: 'text' },
                            { key: 'standard', ty: 'text' },
                            { key: 'floor_price', ty: 'text' },
                            { key: 'volume', ty: 'text' },
                        ],
                    },
                },
            },
        },
        { identity: { id: 2, metadata: { metadata: { http: {} } } } },
        {
            call: {
                id: 3,
                inlets: [{ id: 4 }, { id: 1 }],
                metadata: {
                    ic: {
                        trigger: { click: { text: { const: { text: 'Start' } } } },
                        identity: 4,
                        action: {
                            call: {
                                canister_id: { const: { text: 'udtw4-baaaa-aaaah-abc3q-cai' } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: candid,
                                            method: 'listCollections2',
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = data.map(d => ({
                                        canister_id: d.info.canisterId.toText(),
                                        name: d.info.name,
                                        standard: d.info.standard.ext !== undefined ? 'ext' : 'ogy',
                                        floor_price: d.stats[0]?.floorPrice.toString() ?? '',
                                        volume: d.stats[0]?.volumeTrade.toString() ?? '',
                                        }))`,
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
                            { key: 'canister_id', ty: 'text' },
                            { key: 'name', ty: 'text' },
                            { key: 'standard', ty: 'text' },
                            { key: 'floor_price', ty: 'text' },
                            { key: 'volume', ty: 'text' },
                        ],
                    },
                },
            },
        },
        {
            identity: {
                id: 4,
                metadata: { metadata: { ic: { includes: [{ any: {} }] } } },
            },
        },
        {
            code: {
                id: 5,
                inlets: [{ id: 1 }, { id: 3 }],
                metadata: {
                    data: [
                        { key: 'stat', value: { refer: { endpoint: { id: 1 } } } },
                        { key: 'canister', value: { refer: { endpoint: { id: 3 } } } },
                    ],
                    code: {
                        code: {
                            code: {
                                code: `
                                let canisters = [];
                                for (let i = 0; i < data.stat.length; i++) {
                                    let canister_id = data.stat[i].canister_id;
                                    if (!canisters.includes(canister_id)) canisters.push(canister_id);
                                }
                                for (let i = 0; i < data.canister.length; i++) {
                                    let canister_id = data.canister[i].canister_id;
                                    if (!canisters.includes(canister_id)) canisters.push(canister_id);
                                }
                                result = {
                                    headers: ['Canister ID', 'Name', 'Standard', 'Floor Price', 'Volume', 'Stat', 'Dapp'],
                                    rows: canisters.map(c => {
                                        const stat = data.stat.find(s => s.canister_id === c);
                                        const canister = data.canister.find(s => s.canister_id === c);
                                        return [
                                            (stat?.canister_id ? stat.canister_id : canister?.canister_id) ?? '',
                                            (stat?.name ? stat.name : canister?.name) ?? '',
                                            (stat?.standard ? stat.standard : canister?.standard) ?? '',
                                            (parseInt((stat?.floor_price ? stat.floor_price : canister?.floor_price) ?? '0') / 100000000).toString(),
                                            (parseInt((stat?.volume ? stat.volume : canister?.volume) ?? '0') / 100000000).toString(),
                                            stat === undefined ? 'miss' : '',
                                            canister === undefined ? 'miss' : '',
                                        ]
                                    })
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
                id: 6,
                inlets: [{ id: 5 }],
                metadata: { table: { value: { refer: { endpoint: { id: 5 } } } } },
            },
        },
    ],
};
