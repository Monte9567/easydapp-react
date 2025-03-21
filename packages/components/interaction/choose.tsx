import { parse_custom_style } from '@jellypack/runtime/lib/model/common/custom';
import { ComponentId } from '@jellypack/runtime/lib/model/common/identity';
import { ComponentInteraction } from '@jellypack/runtime/lib/model/components/interaction';
import {
    InteractionChooseMetadata,
    InteractionChooseMetadataStyle,
} from '@jellypack/runtime/lib/model/components/interaction/choose';
import { CombinedRuntime } from '@jellypack/runtime/lib/runtime';
import React, { useCallback, useEffect, useState } from 'react';

import Button from '../../common/button';
import Icon from '../../common/icon';

interface ChooseItem {
    name: string;
    value: string;
}

export function ComponentInteractionChooseView({
    runtime,
    link,
    updated,
    metadata,
}: {
    className?: string;
    runtime: CombinedRuntime;
    link: ComponentId;
    updated: number;
    interaction: ComponentInteraction;
    metadata: InteractionChooseMetadata;
}) {
    const [value, setValue] = React.useState<string>();
    const [values, setValues] = useState<ChooseItem[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const onChoose = useCallback(
        (value: string) => {
            // console.debug(`🚀 ~ onChange ~ value:`, value);
            setLoading(true);
            runtime.refresh_interaction(link, value); // renew
            setValue(value);
            setLoading(false);
        },
        [runtime, link],
    );

    const onClean = useCallback(() => {
        setLoading(true);
        runtime.refresh_interaction(link, undefined);
        setValue(undefined);
        setLoading(false);
    }, [runtime, link]);

    // * custom style
    const custom = parse_custom_style<InteractionChooseMetadataStyle>(metadata.style);

    useEffect(() => {
        if (runtime.should_show(link)) {
            // Read the output value
            const value = runtime.find_value<string>(link, 0);
            setValue(value?.value);

            // Calculate input value
            let values: ChooseItem[] | undefined = [];
            for (const v of metadata.values) {
                const { name, value: input_value } = v;
                const value = runtime.input_value<string>(input_value, ['text']);
                if (value === undefined) {
                    values = undefined;
                    break;
                }
                values.push({ name, value });
            }
            setValues(values);
        }

        runtime.update_component(link, updated); // Directly update
    }, [runtime, link, metadata, updated]);

    return (
        <div
            className="w-full ez-gap-y-2"
            style={{
                paddingTop: custom?.style?.paddingTop || '5px',
                paddingBottom: custom?.style?.paddingBottom || '5px',
            }}
        >
            {
                // Already determined parameters
                values !== undefined && value !== undefined && (
                    <div className={`ez-flex ez-w-full ez-items-center`}>
                        <div className="ez-mb-1 ez-flex ez-w-full ez-font-['JetBrainsMono'] ez-text-sm ez-font-medium ez-text-black dark:ez-text-white">
                            {custom?.outputLabel ? `${custom.outputLabel}: ` : ''} {value}
                        </div>
                        <div
                            onClick={() => !loading && onClean()}
                            className="ez-flex ez-h-[24px] ez-cursor-pointer ez-items-center ez-justify-center ez-rounded-md !ez-border-[1px] ez-border-[#dddddd] ez-px-[6px] ez-py-[3px] ez-text-xs ez-text-[#999999] ez-duration-75 hover:!ez-border-[#000] hover:ez-text-[#000] dark:!ez-border-[#333333] dark:!ez-text-[#999] dark:hover:!ez-border-[#9bff21] dark:hover:!ez-text-[#9bff21]"
                        >
                            <Icon className="ez-mr-[5px] ez-h-3 ez-w-3" name="ez-icon-refresh"></Icon>
                            Reset
                        </div>
                        {/* <Button
                            loading={loading}
                            onClick={() => !loading && onClean()}
                            buttonText="Clean"
                            style={{
                                color: custom?.style?.color,
                                backgroundColor: custom?.style?.backgroundColor,
                                borderRadius: custom?.style?.borderRadius || '0.5rem',
                                fontWeight: custom?.style?.fontWeight || '400',
                            }}></Button> */}
                    </div>
                )
            }

            {
                // Input parameter OK
                values !== undefined && value === undefined && (
                    <div
                        className="ez-grid ez-grid-cols-2 ez-items-center ez-gap-2"
                        style={{
                            gridTemplateColumns: custom?.style?.gridTemplateColumns || 'repeat(2, minmax(0, 1fr))',
                        }}
                    >
                        {values.map((item, index) => (
                            <Button
                                key={index}
                                loading={loading}
                                onClick={() => !loading && onChoose(item.value)}
                                buttonText={item.name || ''}
                                style={{
                                    color: custom?.style?.color,
                                    backgroundColor: custom?.style?.backgroundColor,
                                    borderRadius: custom?.style?.borderRadius || '0.5rem',
                                    fontWeight: custom?.style?.fontWeight || '400',
                                }}
                                className={
                                    (custom?.style?.gridTemplateColumns === 'repeat(2, minmax(0, 1fr))' &&
                                        values?.length % 2 === 1 &&
                                        values?.length - 1 === index &&
                                        'ez-col-span-full',
                                    custom?.style?.gridTemplateColumns === 'repeat(3, minmax(0, 1fr))' &&
                                        values?.length % 3 === 2 &&
                                        values?.length - 1 === index &&
                                        'ez-col-span-full',
                                    custom?.style?.gridTemplateColumns === 'repeat(3, minmax(0, 1fr))' &&
                                        values?.length % 3 === 2 &&
                                        values?.length - 2 === index &&
                                        'ez-col-span-full',
                                    custom?.style?.gridTemplateColumns === 'repeat(3, minmax(0, 1fr))' &&
                                        values?.length % 3 === 1 &&
                                        values?.length - 1 === index &&
                                        'ez-col-span-full')
                                }
                            ></Button>
                        ))}
                    </div>
                )
            }
        </div>
    );
}
