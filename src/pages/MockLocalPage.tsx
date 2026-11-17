import { compile_code } from '@jellypack/compiler/lib/common/code';
import {
    proxy_query_api,
    proxy_query_code,
    proxy_query_combined,
    proxy_query_dapp_by_token,
    proxy_query_publisher,
} from '@jellypack/runtime/lib/canisters/storage';
import { LinkComponent } from '@jellypack/runtime/lib/model';
import { doExecuteByRemote } from '@jellypack/runtime/lib/model/components/code/by_remote';
// import { doExecuteBySaferEvalDirectly } from '@jellypack/runtime/lib/model/components/code/by_safer_eval';
import { doExecuteByWasmFactory } from '@jellypack/runtime/lib/model/components/code/by_wasm';
import { doExecuteByWasmAndRemoteAndCachedFactory } from '@jellypack/runtime/lib/model/components/code/by_wasm_and_remote_and_cached';
import { ApiData, ApiDataAnchor } from '@jellypack/runtime/lib/store/api';
import { CodeData, CodeDataAnchor } from '@jellypack/runtime/lib/store/code';
import { Combined, CombinedAnchor } from '@jellypack/runtime/lib/store/combined';
import { DappMetadata, DappView } from '@jellypack/runtime/lib/store/dapp';
import { DappAccessView } from '@jellypack/runtime/lib/store/dapp/access';
import { Publisher, PublisherAnchor } from '@jellypack/runtime/lib/store/publisher';
import { ApisCheckFunction } from '@jellypack/runtime/lib/wasm';
import { CodeItem } from '@jellypack/types/lib/code';
import { check, execute_code, find_origin_codes, parse_func_candid, parse_service_candid } from '@jellypack/wasm-api';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { execute_code_by_comlink } from '../../packages/common/execute';
import { LinkDappView } from '../../packages/dapp';
import { ThemeBar } from '../components/theme';
import * as yuku01 from '../examples-yuku/yuku01';
import * as yuku02 from '../examples-yuku/yuku02';
import * as yuku03 from '../examples-yuku/yuku03';
import * as example01 from '../examples/example01';
import * as example02 from '../examples/example02';
import * as example03 from '../examples/example03';
import * as example04 from '../examples/example04';
import * as example05 from '../examples/example05';
import * as example06 from '../examples/example06';
import * as example07 from '../examples/example07';
import * as example08 from '../examples/example08';

const doExecuteByWasm = doExecuteByWasmFactory(execute_code);
const doExecuteByWasmAndRemoteAndCached = doExecuteByWasmAndRemoteAndCachedFactory(execute_code, doExecuteByRemote);

const testExecute = async () => {
    const code = `
        const fi = (n) => {
            if (n === 1 || n === 2) return 1;
            return fi(n - 1) + fi(n - 2);
        }
        result = fi(31);
    `;
    const args: [string, any][] = [];

    await doExecuteByWasm(code, args, false);
    const max = 1;
    let test1 = 0;
    let test2 = 0;
    let test3 = 0;
    const ss = Date.now();
    for (let i = 0; i < max; i++) {
        const s = Date.now();
        // await doExecuteBySaferEvalAndFunction(code, args, false);
        // await doExecuteBySaferEvalDirectly(code, args, false);
        const s1 = Date.now();
        await doExecuteByWasm(code, args, false);
        const s2 = Date.now();
        await doExecuteByRemote(code, args, false);
        const s3 = Date.now();
        test1 += s1 - s;
        test2 += s2 - s1;
        test3 += s3 - s2;
    }
    const ee = Date.now();

    console.debug(`🚀 ~ eval test1:`, test1 / max);
    console.debug(`🚀 ~ wasm test2:`, test2 / max);
    console.debug(`🚀 ~ remote test3:`, test3 / max);
    console.debug(`🚀 ~ test spend:`, ee - ss, 'ms');
};

const onMockLocal = async ([name, icon, combined]: [
    string,
    string,
    {
        version: string;
        components: LinkComponent[];
    },
]): Promise<{
    dapp: DappView;
    combined: Combined;
    codes: Record<CodeDataAnchor, CodeData>;
    apis: Record<ApiDataAnchor, ApiData>;
}> => {
    console.info('testExecute', testExecute);
    console.info('testExecute', execute_code_by_comlink);
    // TEST
    // await testExecute();

    // await execute_code_by_comlink(
    //     `const fi = (n) => {
    //         if (n === 1 || n === 2) return 1;
    //         return fi(n - 1) + fi(n - 2);
    //     }
    //     result = fi(31);`,
    //     [],
    //     true,
    // );

    // const s = Date.now();
    // const result = await doExecuteByWasm(
    //     `const fi = (n) => {
    //         if (n === 1 || n === 2) return 1;
    //         return fi(n - 1) + fi(n - 2);
    //     }
    //     result = fi(31);`,
    //     [],
    //     true,
    // );
    // const e = Date.now();
    // console.error('xxxx 222 spend', e - s, 'ms', result);

    const fetch: ApisCheckFunction = {
        canister_id: 'zhyj6-vaaaa-aaaai-q3luq-cai',
        codes: {},
        apis: {},
        combines: {},
        origin_apis: {
            hash_origins: {},
            key_hashes: {},
        },
        compiled: [],
    };
    const origin_codes = await find_origin_codes(combined.components, fetch, true);

    const codes: [CodeItem, string][] = [];

    console.debug(`🚀 ~ codes 1:`, codes);

    await Promise.all(
        origin_codes.map(async (item) => {
            const code = item.code;
            const compiled = await compile_code(code);
            codes.push([code, compiled]);
        }),
    );

    console.debug(`🚀 ~ codes 2:`, codes);

    fetch.compiled = codes;

    const checked = await check(combined.components, fetch, true);
    console.debug(`🚀 ~ checked:`, checked);

    return {
        dapp: {
            id: '1',
            created: 0,
            updated: 0,
            reason: '',
            access: 'none',
            accessed: 0,
            called: 0,
            collected: 0,
            category: 'Others',
            info: {
                icon,
                name,
                description: '',
                social: '{}',
            },
            publisher: 'publisher#zhyj6-vaaaa-aaaai-q3luq-cai#1',
            combined: 'combined#zhyj6-vaaaa-aaaai-q3luq-cai#1',
            metadata: checked.metadata,
        },
        combined: {
            anchor: 'combined#zhyj6-vaaaa-aaaai-q3luq-cai#1',
            created: 0,
            called: 0,
            version: combined.version,
            components: checked.components,
            metadata: checked.metadata,
        },
        codes: checked.codes,
        apis: checked.apis,
    };
};

export function MockCombinedPage() {
    const { name }: { name?: string } = useParams();
    const location = useLocation();
    const search = location.search;

    const [dapp, setDapp] = useState<DappView>();
    const [combined, setCombined] = useState<Combined>();
    const [codes, setCodes] = useState<Record<CodeDataAnchor, CodeData>>();
    const [apis, setApis] = useState<Record<ApiDataAnchor, ApiData>>();

    const upper_query_dapp_access = useCallback(async (id: string): Promise<DappAccessView> => {
        console.log('query_dapp_access', id);
        return 'none';
    }, []);
    const upper_query_dapp = useCallback(
        async (id: string) => {
            if (dapp && dapp.id === id) return dapp;
            return proxy_query_dapp_by_token(id);
        },
        [dapp],
    );
    const upper_query_publisher = useCallback(async (anchor: PublisherAnchor): Promise<Publisher | undefined> => {
        if (anchor === 'publisher#zhyj6-vaaaa-aaaai-q3luq-cai#1')
            return {
                anchor: 'publisher#zhyj6-vaaaa-aaaai-q3luq-cai#1',
                name: 'Test Author',
                avatar: '',
                bio: '',
                social: '',
            };
        return proxy_query_publisher(anchor);
    }, []);
    const upper_query_code = useCallback(
        async (anchor: CodeDataAnchor) => {
            if (codes && codes[anchor]) return codes[anchor];
            return proxy_query_code(anchor);
        },
        [codes],
    );
    const upper_query_api = useCallback(
        async (anchor: ApiDataAnchor) => {
            if (apis && apis[anchor]) return apis[anchor];
            return proxy_query_api(anchor);
        },
        [apis],
    );
    const upper_query_combined = useCallback(
        async (anchor: CombinedAnchor) => {
            if (combined && combined.anchor === anchor) return combined;
            return proxy_query_combined(anchor);
        },
        [combined],
    );

    useEffect(() => {
        if (!name) return;
        onMockLocal(
            (() => {
                switch (name) {
                    case 'example01':
                        return [example01.name, example01.icon, example01.combined];
                    case 'example02':
                        return [example02.name, example02.icon, example02.combined];
                    case 'example03':
                        return [example03.name, example03.icon, example03.combined];
                    case 'example04':
                        return [example04.name, example04.icon, example04.combined];
                    case 'example05':
                        return [example05.name, example05.icon, example05.combined];
                    case 'example06':
                        return [example06.name, example06.icon, example06.combined];
                    case 'example07':
                        return [example07.name, example07.icon, example07.combined];
                    case 'example08':
                        return [example08.name, example08.icon, example08.combined];
                    case 'yuku01':
                        return [yuku01.name, yuku01.icon, yuku01.combined];
                    case 'yuku02':
                        return [yuku02.name, yuku02.icon, yuku02.combined];
                    case 'yuku03':
                        return [yuku03.name, yuku03.icon, yuku03.combined];
                }
                throw new Error(`wrong name: ${name}`);
            })(),
        ).then((json) => {
            console.debug(`🚀 ~ .then ~ json:`, json);
            const dapp: DappView = json.dapp;
            const combined: Combined = json.combined;
            const codes: Record<CodeDataAnchor, CodeData> = json.codes;
            const apis: Record<ApiDataAnchor, ApiData> = json.apis;
            setDapp(dapp);
            setCombined(combined);
            setCodes(codes);
            setApis(apis);
        });
    }, [name]);

    const [dappMetadata, setDappMetadata] = useState<DappMetadata>();
    const [publisher, setPublisher] = useState<Publisher>();

    return (
        <div className="easydapp-page ez-flex ez-flex-col">
            <ThemeBar />

            <div className="easydapp-page-inner">
                <div className="header">
                    {dappMetadata && (
                        <h2 className="ez-h-[30px]">
                            <img src={dappMetadata.info.icon} /> <div>{dappMetadata.info.name}</div> <div></div>
                        </h2>
                    )}
                    {dappMetadata && <h5 style={{ marginBlock: '0.25rem' }}> called: {dappMetadata.called} </h5>}
                    {publisher && <h4 style={{ marginBlock: '0.25rem' }}> {publisher.name} </h4>}
                </div>
                {dapp && combined && codes && apis && (
                    <LinkDappView
                        id={`${dapp.id}${search.startsWith('?') ? '' : '?'}${search}`}
                        query_dapp_access={upper_query_dapp_access}
                        query_dapp={upper_query_dapp}
                        query_publisher={upper_query_publisher}
                        query_code={upper_query_code}
                        query_api={upper_query_api}
                        query_combined={upper_query_combined}
                        onDappMetadata={setDappMetadata}
                        onPublisher={setPublisher}
                        code_executor={doExecuteByWasmAndRemoteAndCached}
                        parse_service_candid={parse_service_candid}
                        parse_func_candid={parse_func_candid}
                    />
                )}
            </div>
        </div>
    );
}
