import { LinkComponent } from '@jellypack/runtime/lib/model/components';

export const app_id = 5061112526993110;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Example 6: temp';
export const icon = 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png';
export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
        {
            code: {
                id: 1,
                metadata: {
                    code: {
                        code: {
                            code: {
                                code: `const fi = (n) => {
                                    if (n === 1 || n === 2) return 1;
                                    return fi(n - 1) + fi(n - 2);
                                }
                                result = fi(31);`,
                            },
                            js: '',
                        },
                    },
                },
                output: 'number',
            },
        },
        {
            view: {
                id: 2,
                metadata: { text: { value: { refer: { endpoint: { id: 1 } } } } },
                inlets: [{ id: 1 }],
            },
        },
    ],
};
