import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { ThemeBar } from '../components/theme';

export function HomePage() {
    const [count, setCount] = useState(0);

    const [published, setPublished] = useState<
        { id: number; info: { name: string }; anchor?: string }[]
    >([]);
    useEffect(() => {
        fetch('https://app.easydapp.ai/open/query/published/apps')
            .then((d) => d.json())
            .then((d) => setPublished(d.data));
    }, []);

    return (
        <>
            <ThemeBar />
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <div>
                    <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                </div>

                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>

                <div
                    className="link"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                        {published.map((item) => {
                            return (
                                <div style={{ textDecoration: 'underline' }} key={item.id}>
                                    <NavLink to={`/extension/${item.anchor}`} target="_blank">
                                        {item.info.name}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
}
