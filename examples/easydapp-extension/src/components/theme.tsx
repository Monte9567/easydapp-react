import { useCallback, useEffect, useState } from 'react';

const reset = (mode: 'light' | 'dark' | 'dark2') => {
    switch (mode) {
        case 'light': {
            document.body.removeAttribute('data-theme');
            document.body.setAttribute(
                'style',
                'background-color: rgb(255, 255, 255); scrollbar-color: rgb(185, 202, 211) rgb(247, 249, 249);',
            );
            document
                .getElementsByTagName('html')[0]
                .setAttribute(
                    'style',
                    'overflow-y: scroll; overscroll-behavior-y: none; font-size: 15px; color-scheme: light;',
                );
            break;
        }
        case 'dark': {
            document.body.setAttribute('data-theme', 'dark');
            document.body.setAttribute(
                'style',
                'background-color: rgb(21, 32, 43); scrollbar-color: rgb(92, 110, 126) rgb(30, 39, 50);',
            );
            document
                .getElementsByTagName('html')[0]
                .setAttribute(
                    'style',
                    'overflow-y: scroll; overscroll-behavior-y: none; font-size: 15px; color-scheme: dark;',
                );
            break;
        }
        case 'dark2': {
            document.body.setAttribute('data-theme', 'dark');
            document.body.setAttribute(
                'style',
                'background-color: rgb(0, 0, 0); scrollbar-color: rgb(62, 65, 68) rgb(22, 24, 28);',
            );
            document
                .getElementsByTagName('html')[0]
                .setAttribute(
                    'style',
                    'overflow-y: scroll; overscroll-behavior-y: none; font-size: 15px; color-scheme: dark;',
                );
            break;
        }
    }
};

export function ThemeBar() {
    const [mode, setMode] = useState<'light' | 'dark' | 'dark2'>(() => {
        const mode = (localStorage.getItem('__mode__') ??
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) as
            | 'light'
            | 'dark'
            | 'dark2';
        reset(mode);
        return mode;
    });

    useEffect(() => {
        reset(mode);
    }, [mode]);

    const onMode = useCallback((mode: 'light' | 'dark' | 'dark2') => {
        setMode(mode);
        localStorage.setItem('__mode__', mode);
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '20px',
            }}
        >
            <div
                className={`mode-button ${mode === 'light' ? `mode-choose` : ''}`}
                onClick={() => onMode('light')}
            >
                Light
            </div>
            <div
                className={`mode-button ${mode === 'dark' ? `mode-choose` : ''}`}
                onClick={() => onMode('dark')}
            >
                Dark{' '}
            </div>
            <div
                className={`mode-button ${mode === 'dark2' ? `mode-choose` : ''}`}
                onClick={() => onMode('dark2')}
            >
                Dark2
            </div>
        </div>
    );
}
