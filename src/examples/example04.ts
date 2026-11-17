import { LinkComponent } from '@jellypack/runtime/lib/model/components';

export const app_id = 686430797032463;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Example 4: interaction condition view';
export const icon = 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png';
export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
        {
            view: {
                id: 1,
                metadata: { text: { value: { const: { text: 'Test condition view' } } } },
            },
        },
        {
            interaction: {
                id: 2,
                metadata: {
                    metadata: {
                        choose: {
                            values: [
                                {
                                    name: 'Text',
                                    value: { const: { text: 'text' } },
                                },
                                {
                                    name: 'Bool',
                                    value: { const: { text: 'bool' } },
                                },
                                {
                                    name: 'Image',
                                    value: { const: { text: 'image' } },
                                },
                                {
                                    name: 'Table',
                                    value: { const: { text: 'table' } },
                                },
                                {
                                    name: 'Html',
                                    value: { const: { text: 'html' } },
                                },
                                {
                                    name: 'Array',
                                    value: { const: { text: 'array' } },
                                },
                                {
                                    name: 'Object',
                                    value: { const: { text: 'object' } },
                                },
                                {
                                    name: 'Else',
                                    value: { const: { text: 'else' } },
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            condition: {
                id: 3,
                inlets: [{ id: 2 }],
                metadata: {
                    conditions: [
                        {
                            required: {
                                value: { endpoint: { id: 2 } },
                                matches: {
                                    text: { equal: { const: { text: 'text' } } },
                                },
                            },
                        },
                        {
                            required: {
                                value: { endpoint: { id: 2 } },
                                matches: {
                                    text: { equal: { const: { text: 'bool' } } },
                                },
                            },
                        },
                        {
                            required: {
                                value: { endpoint: { id: 2 } },
                                matches: {
                                    text: { equal: { const: { text: 'image' } } },
                                },
                            },
                        },
                        {
                            required: {
                                value: { endpoint: { id: 2 } },
                                matches: {
                                    text: { equal: { const: { text: 'table' } } },
                                },
                            },
                        },
                        {
                            required: {
                                value: { endpoint: { id: 2 } },
                                matches: {
                                    text: { equal: { const: { text: 'html' } } },
                                },
                            },
                        },
                        {
                            required: {
                                value: { endpoint: { id: 2 } },
                                matches: {
                                    text: { equal: { const: { text: 'array' } } },
                                },
                            },
                        },
                        {
                            required: {
                                value: { endpoint: { id: 2 } },
                                matches: {
                                    text: { equal: { const: { text: 'object' } } },
                                },
                            },
                        },
                    ],
                },
            },
        },
        {
            view: {
                id: 4,
                inlets: [{ id: 3, index: 7 }],
                metadata: { text: { value: { const: { text: 'Choose any view please.' } } } },
            },
        },
        {
            view: {
                id: 5,
                inlets: [{ id: 3 }],
                metadata: { text: { value: { const: { text: 'This is Text view.' } } } },
            },
        },
        {
            view: {
                id: 6,
                inlets: [{ id: 3, index: 1 }],
                metadata: { bool: { value: { const: { bool: true } } } },
            },
        },
        {
            view: {
                id: 7,
                inlets: [{ id: 3, index: 2 }],
                metadata: {
                    image: {
                        value: {
                            const: {
                                text: 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png',
                            },
                        },
                    },
                },
            },
        },
        {
            view: {
                id: 8,
                inlets: [{ id: 3, index: 3 }],
                metadata: {
                    table: {
                        value: {
                            const: {
                                object: [
                                    {
                                        key: 'headers',
                                        value: {
                                            array: {
                                                ty: 'text',
                                                values: [
                                                    { text: 'header1' },
                                                    { text: 'header2' },
                                                    { text: 'header3' },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        key: 'rows',
                                        value: {
                                            array: {
                                                ty: { array: 'text' },
                                                values: [
                                                    {
                                                        array: {
                                                            ty: 'text',
                                                            values: [
                                                                { text: 'row1.1' },
                                                                { text: 'row1.2' },
                                                                { text: 'row1.3' },
                                                            ],
                                                        },
                                                    },
                                                    {
                                                        array: {
                                                            ty: 'text',
                                                            values: [
                                                                { text: 'row2.1' },
                                                                { text: 'row2.2' },
                                                                { text: 'row2.3' },
                                                            ],
                                                        },
                                                    },
                                                    {
                                                        array: {
                                                            ty: 'text',
                                                            values: [
                                                                { text: 'row3.1' },
                                                                { text: 'row3.2' },
                                                                { text: 'row3.3' },
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
        {
            view: {
                id: 9,
                inlets: [{ id: 3, index: 4 }],
                metadata: {
                    html: {
                        image: [
                            {
                                key: 'image',
                                value: {
                                    const: {
                                        text: 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png',
                                    },
                                },
                            },
                        ],
                        text: [
                            {
                                key: 'text',
                                value: {
                                    const: {
                                        text: 'This is HTML view.',
                                    },
                                },
                            },
                        ],
                        template: `<div>
                            <div>\${text}</div>
                            <div><img src="\${image}"/></div>
                            <div>\${text}</div>
                        </div>`,
                    },
                },
            },
        },
        {
            view: {
                id: 10,
                inlets: [{ id: 3, index: 5 }],
                metadata: {
                    array: {
                        value: {
                            const: {
                                array: {
                                    ty: 'text',
                                    values: [
                                        { text: 'array1' },
                                        { text: 'array2' },
                                        { text: 'array3' },
                                    ],
                                },
                            },
                        },
                        inner: {
                            text: {},
                        },
                    },
                },
            },
        },
        {
            view: {
                id: 11,
                inlets: [{ id: 3, index: 6 }],
                metadata: {
                    object: {
                        value: {
                            const: {
                                object: [
                                    { key: 'text', value: { text: 'text' } },
                                    { key: 'bool', value: { bool: false } },
                                    { key: 'integer', value: { integer: 123123 } },
                                    { key: 'number', value: { number: 123123.123123 } },
                                    {
                                        key: 'image',
                                        value: {
                                            text: 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png',
                                        },
                                    },
                                    {
                                        key: 'table',
                                        value: {
                                            object: [
                                                {
                                                    key: 'headers',
                                                    value: {
                                                        array: {
                                                            ty: 'text',
                                                            values: [
                                                                { text: 'header1' },
                                                                { text: 'header2' },
                                                                { text: 'header3' },
                                                            ],
                                                        },
                                                    },
                                                },
                                                {
                                                    key: 'rows',
                                                    value: {
                                                        array: {
                                                            ty: { array: 'text' },
                                                            values: [
                                                                {
                                                                    array: {
                                                                        ty: 'text',
                                                                        values: [
                                                                            { text: 'row1.1' },
                                                                            { text: 'row1.2' },
                                                                            { text: 'row1.3' },
                                                                        ],
                                                                    },
                                                                },
                                                                {
                                                                    array: {
                                                                        ty: 'text',
                                                                        values: [
                                                                            { text: 'row2.1' },
                                                                            { text: 'row2.2' },
                                                                            { text: 'row2.3' },
                                                                        ],
                                                                    },
                                                                },
                                                                {
                                                                    array: {
                                                                        ty: 'text',
                                                                        values: [
                                                                            { text: 'row3.1' },
                                                                            { text: 'row3.2' },
                                                                            { text: 'row3.3' },
                                                                        ],
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        key: 'html',
                                        value: {
                                            object: [
                                                {
                                                    key: 'image',
                                                    value: {
                                                        object: [
                                                            {
                                                                key: 'image',
                                                                value: {
                                                                    text: 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png',
                                                                },
                                                            },
                                                        ],
                                                    },
                                                },
                                                {
                                                    key: 'text',
                                                    value: {
                                                        object: [
                                                            {
                                                                key: 'text',
                                                                value: {
                                                                    text: 'This is HTML view.',
                                                                },
                                                            },
                                                        ],
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        inner: [
                            {
                                key: 'text',
                                inner: { text: {} },
                            },
                            {
                                key: 'bool',
                                inner: { bool: {} },
                            },
                            {
                                key: 'integer',
                                inner: { text: {} },
                            },
                            {
                                key: 'number',
                                inner: { text: {} },
                            },
                            {
                                key: 'image',
                                inner: { image: {} },
                            },
                            {
                                key: 'table',
                                inner: { table: {} },
                            },
                            {
                                key: 'html',
                                inner: {
                                    html: {
                                        template: `<div>
                                            <div>\${text}</div>
                                            <div><img src="\${image}"/></div>
                                            <div>\${text}</div>
                                        </div>`,
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        },
    ],
};
