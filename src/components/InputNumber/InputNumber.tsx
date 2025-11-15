'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';

import { UserIcon, ChevronUp, ChevronDown } from '~/components/Icons';
import styles from './InputNumber.module.scss';

const cx = classNames.bind(styles);

interface Props {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    inputNumberName: string;
}

export default function InputNumber({ value = 0, onChange, min, max, step = 1, inputNumberName }: Props) {
    const [internalValue, setInternalValue] = useState<string>(value.toString());

    // fix min/max và NaN
    const fixValue = (val: string | number) => {
        let num = Number(val);
        if (isNaN(num)) num = min ?? 0;
        if (min !== undefined && num < min) num = min;
        if (max !== undefined && num > max) num = max;
        return num;
    };

    // khi blur hoặc enter
    const commitValue = () => {
        const num = fixValue(internalValue);
        setInternalValue(num.toString());
        onChange?.(num);
    };

    const handleChange = (val: string) => {
        // Chỉ cho phép: số, trống (để xoá)
        if (/^\d*$/.test(val) || val === '') {
            setInternalValue(val);
        }
    };

    const handleStep = (delta: number) => {
        const num = fixValue(internalValue) + delta;
        const final = fixValue(num);
        setInternalValue(final.toString());
        onChange?.(final);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleStep(+step);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleStep(-step);
        } else if (e.key === 'Enter') {
            commitValue();
            // blur input để thoát focus
            (e.target as HTMLInputElement).blur();
        } else if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            // Chặn ký tự không phải số
            e.preventDefault();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('heading')}>NO. OF PASSENGER</h4>
            <div className={cx('input-container')}>
                <label className={cx('input-group')}>
                    <div className={cx('icon-wrapper')}>
                        <UserIcon />
                    </div>
                    <input
                        type="number"
                        className={cx('input')}
                        value={internalValue}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={commitValue}
                        onKeyDown={handleKeyDown}
                        name={inputNumberName}
                    />
                </label>
                <div className={cx('controls')}>
                    <button type="button" className={cx('btn', 'up-btn')} onClick={() => handleStep(+step)}>
                        <div className={cx('btn-icon-wrapper')}>
                            <ChevronUp />
                        </div>
                    </button>
                    <button type="button" className={cx('btn', 'down-btn')} onClick={() => handleStep(-step)}>
                        <div className={cx('btn-icon-wrapper')}>
                            <ChevronDown />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
