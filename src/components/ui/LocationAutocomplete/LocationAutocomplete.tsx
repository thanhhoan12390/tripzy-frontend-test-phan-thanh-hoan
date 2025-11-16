'use client';

import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';

import { BusIcon } from '~/components/ui/Icons';
import { Location, locations } from '~/data/locations';
import styles from './LocationAutocomplete.module.scss';

const cx = classNames.bind(styles);

interface LocationAutocompleteProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    locationInputName: string;
    heading: string;
}

function LocationAutocomplete({
    placeholder = 'Enter city, terminal...',
    value = '',
    onChange,
    locationInputName,
    heading,
}: LocationAutocompleteProps) {
    const LabelElement = (shortCode: string, englishName: string, codeState: string) => {
        return (
            <div className={cx('location-item-wrapper')}>
                <div className={cx('location-name')}>
                    {shortCode} - {englishName}
                </div>
                <div className={cx('location-code')}>{codeState}</div>
            </div>
        );
    };

    const [options, setOptions] = useState<{ value: string; label: React.ReactNode; data: Location }[]>(() =>
        locations.map((location) => ({
            value: location.english_name,
            label: LabelElement(location.short_code, location.english_name, location.code_state),
            data: location,
        })),
    );

    // Filter locations theo search text
    const getFilteredOptions = (searchText: string) => {
        const searchTerm = searchText.toLowerCase();

        return locations
            .filter(
                (location) =>
                    location.english_name.toLowerCase().includes(searchTerm) ||
                    location.short_code.toLowerCase().includes(searchTerm) ||
                    location.code_state.toLowerCase().includes(searchTerm),
            )
            .map((location) => ({
                value: location.english_name,
                label: LabelElement(location.short_code, location.english_name, location.code_state),
                data: location,
            }));
    };

    const handleChange = (newValue: string) => {
        const filteredOptions = getFilteredOptions(newValue);
        setOptions(filteredOptions);

        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('location-heading')}>{heading}</h4>
            <AutoComplete
                options={options}
                onChange={handleChange}
                value={value}
                filterOption={false}
                popupMatchSelectWidth={331}
                listItemHeight={51.2}
                listHeight={51.2 * 6 + 8}
                virtual={false}
                getPopupContainer={(triggerNode) => triggerNode.parentElement!}
            >
                <Input placeholder={placeholder} prefix={<BusIcon />} name={locationInputName} />
            </AutoComplete>

            {true && (
                <div className={cx('validate-message')}>
                    <span>
                        Error message Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae cupiditate est
                        distinctio voluptates ducimus dolor. Ea amet, eius iusto similique sapiente molestias hic
                        obcaecati? In illum nulla ad esse fugiat?
                    </span>
                </div>
            )}
        </div>
    );
}

export default LocationAutocomplete;
