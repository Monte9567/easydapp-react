import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
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

export function HomePage() {
    const [count, setCount] = useState(0);

    const local = [
        ['example01', example01.name],
        ['example02', example02.name],
        ['example03', example03.name],
        ['example04', example04.name],
        ['example05', example05.name],
        ['example06', example06.name],
        ['example07', example07.name],
        ['example08', example08.name],
        ['yuku01', yuku01.name],
        ['yuku02', yuku02.name],
        ['yuku03', yuku03.name],
    ];

    const [published, setPublished] = useState<{ id: number; info: { name: string }; anchor?: string }[]>([]);
    useEffect(() => {
        fetch('https://app.easydapp.ai/open/query/published/apps')
            .then((d) => d.json())
            .then((d) => setPublished(d.data));
    }, []);

    return (
        <>
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
                    }}
                >
                    <div className="ez-flex ez-flex-col">
                        {published.map((item) => {
                            return (
                                <div className="ez-underline" key={item.id}>
                                    <NavLink to={`/run/${item.anchor}`} target="_blank">
                                        {item.info.name}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                    <div className="ez-flex ez-flex-col">
                        {local.map((item) => {
                            return (
                                <div className="ez-underline" key={item[0]}>
                                    <NavLink to={`/mock/${item[0]}`} target="_blank">
                                        {item[1]}
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
