import { LinkDappView } from '@easydapp/react';
import '@easydapp/react/lib/react.css';
import { doExecuteByRemote } from '@jellypack/runtime/lib/model/components/code/by_remote';
import { doExecuteByWasmAndRemoteAndCachedFactory } from '@jellypack/runtime/lib/model/components/code/by_wasm_and_remote_and_cached';
import { DappMetadata } from '@jellypack/runtime/lib/store/dapp';
import { Publisher } from '@jellypack/runtime/lib/store/publisher';
import { execute_code, parse_func_candid, parse_service_candid } from '@jellypack/wasm-api';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ThemeBar } from '../components/theme';

const doExecuteByWasmAndRemoteAndCached = doExecuteByWasmAndRemoteAndCachedFactory(
    execute_code,
    doExecuteByRemote,
);

export function CombinedPage() {
    const { share_id }: { share_id?: string } = useParams();
    const location = useLocation();
    const search = location.search;

    const [dappMetadata, setDappMetadata] = useState<DappMetadata>();
    const [publisher, setPublisher] = useState<Publisher>();

    return (
        <>
            <ThemeBar />
            <div className="easydapp-page">
                <div className="easydapp-page-inner">
                    <div className="header">
                        {dappMetadata && (
                            <h2 style={{ height: '30px' }}>
                                <img
                                    src={dappMetadata.info.icon}
                                    style={{ height: '30px', width: '30px' }}
                                />
                                <div>{dappMetadata.info.name}</div> <div></div>
                            </h2>
                        )}
                        {dappMetadata && (
                            <h5 style={{ marginBlock: '0.25rem' }}>
                                {' '}
                                called: {dappMetadata.called}{' '}
                            </h5>
                        )}
                        {publisher && (
                            <h4 style={{ marginBlock: '0.25rem' }}> {publisher.name} </h4>
                        )}
                    </div>

                    <LinkDappView
                        id={`${share_id}${search}`}
                        onDappMetadata={setDappMetadata}
                        onPublisher={setPublisher}
                        code_executor={doExecuteByWasmAndRemoteAndCached}
                        parse_service_candid={parse_service_candid}
                        parse_func_candid={parse_func_candid}
                    />
                </div>
            </div>
        </>
    );
}
