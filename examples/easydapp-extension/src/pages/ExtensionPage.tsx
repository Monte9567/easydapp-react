import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ThemeBar } from '../components/theme';

export function ExtensionPage() {
    const { share_id }: { share_id?: string } = useParams();
    const location = useLocation();
    const search = location.search;

    const [extra, setExtra] = useState<number>(0);

    return (
        <>
            <ThemeBar />
            <div
                className="easydapp-page"
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
                <button onClick={() => setExtra(extra + 1)}>add</button>
                <div className="easydapp-page-inner">
                    <div>{`https://easydapp.ai/run/${share_id}${search}`}</div>
                </div>
                <div className="easydapp-page-inner">
                    <div>{`https://easydapp.ai/run/${share_id}${search}`}</div>
                </div>
                {0 < extra &&
                    Array.from({ length: extra }, (_, i) => i).map((i) => {
                        return (
                            <div className={`easydapp-page-inner count-${i}`} key={i}>
                                <div>{`https://easydapp.ai/run/${share_id}${search}`}</div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
