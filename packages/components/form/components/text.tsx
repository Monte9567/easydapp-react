import { parse_custom_style } from '@jellypack/runtime/lib/model/common/custom';
import { ComponentId } from '@jellypack/runtime/lib/model/common/identity';
import { FormMetadataTextStyle } from '@jellypack/runtime/lib/model/components/form';
import { CombinedRuntime } from '@jellypack/runtime/lib/runtime';
import React, { useCallback, useEffect, useState } from 'react';

export function InnerComponentFormTextView({
    runtime,
    link,
    onValue,
    defaultValue,
    suffix,
    customStyle,
}: {
    runtime: CombinedRuntime;
    link: ComponentId;
    onValue: (value: string | undefined) => void;
    defaultValue?: string;
    suffix?: string;
    customStyle?: string;
}) {
    const [value, setValue] = useState<string>();

    useEffect(() => {
        if (value === undefined && defaultValue !== undefined) {
            setValue(defaultValue);
            if (runtime.should_show(link) || defaultValue === undefined) onValue(defaultValue);
        }
    }, [onValue, defaultValue, value, runtime, link]);

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const input_value = event.target.value;
            if (input_value === value) return;
            setValue(input_value);
            if (runtime.should_show(link) || input_value === undefined) onValue(input_value);
        },
        [onValue, value, runtime, link],
    );

    // * custom style
    const custom = parse_custom_style<FormMetadataTextStyle>(customStyle);

    if (!runtime.should_show(link)) return <></>;
    return (
        <div
            className="ez-flex ez-w-full"
            style={{
                paddingTop: custom?.style?.paddingTop || '5px',
                paddingBottom: custom?.style?.paddingBottom || '5px',
            }}
        >
            <div
                className="ez-flex ez-h-[44px] ez-w-full ez-items-center !ez-border ez-border-[#DDD] ez-px-[12px] ez-font-['JetBrainsMono'] dark:ez-border-[#333]"
                style={{
                    borderRadius: custom?.style?.borderRadius || '0.5rem',
                    borderStyle: custom?.style?.borderStyle || 'solid',
                }}
            >
                <input
                    placeholder={custom?.placeholder}
                    className="ez-flex ez-h-[42px] ez-flex-1 ez-bg-transparent ez-text-black ez-outline-none placeholder:ez-text-[#999] dark:ez-text-white"
                    type="text"
                    value={value ?? ''}
                    onChange={onChange}
                ></input>
                {(suffix ?? custom?.suffix) && (
                    <p className="ez-ml-2 ez-font-['JetBrainsMono'] ez-text-sm ez-font-normal ez-leading-[18px] ez-text-black dark:ez-text-white">
                        {suffix ?? custom?.suffix}
                    </p>
                )}
            </div>
        </div>
    );
}
