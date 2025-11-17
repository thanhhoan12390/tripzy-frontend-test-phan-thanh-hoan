'use client';

import classNames from 'classnames/bind';
import { useState, useEffect, useRef, memo } from 'react';

import { CalendarIcon, ChevronLeft, ChevronRight } from '~/components/ui/Icons';
import styles from './CustomDatePicker.module.scss';

const cx = classNames.bind(styles);

interface CustomDatePickerProps {
    onDateSelect: (date: Date) => void;
    selectedDate?: Date;
    roundtrip?: boolean;
    inputFormName: string;
    isRoundtripChecked?: boolean;
    onRoundtripChange?: (v: boolean) => void;
    validateError: string;
    onValidateErrFocus: () => void;
    pickerId: string;
}

function CustomDatePicker({
    onDateSelect,
    selectedDate,
    roundtrip = false,
    inputFormName,
    isRoundtripChecked,
    onRoundtripChange,
    validateError,
    onValidateErrFocus,
    pickerId,
}: CustomDatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [today] = useState(new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);

    // Tính toán tháng thứ hai từ currentDate
    const secondMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDateSelect = (date: Date, isOtherMonth: boolean = false) => {
        onDateSelect(date);
        setIsOpen(false);

        // Nếu click vào ngày của tháng khác, cập nhật currentDate để nhảy về tháng đó
        if (isOtherMonth) {
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
        }
    };

    // Điều hướng chung cho cả hai tháng
    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} / ${month} / ${year}  00:00`;
    };

    return (
        <div className={cx('wrapper')}>
            {roundtrip ? (
                <div className={cx('checkbox-wrapper')}>
                    <label className={cx('checkbox-container')}>
                        <span className={cx('roundtrip-text')}>ROUND TRIP?</span>
                        <input
                            type="checkbox"
                            name="roundtrip-checkbox"
                            checked={isRoundtripChecked}
                            onChange={(e) => onRoundtripChange?.(e.target.checked)}
                        />
                        <span className={cx('checkmark')}></span>
                    </label>
                </div>
            ) : (
                <h4 className={cx('heading')}>DEPARTURE DATE</h4>
            )}

            <div className={cx('date-picker-container')} ref={datePickerRef}>
                <div className={cx('date-header-wrapper')}>
                    <label
                        className={cx('date-input-wrapper', {
                            ['roundtrip-not-check']: !isRoundtripChecked && roundtrip,
                        })}
                    >
                        <div className={cx('calendar-icon-wrapper')}>
                            <CalendarIcon className={cx('calendar-icon')} height="1.5rem" width="1.5rem" />
                        </div>
                        <input
                            id={pickerId}
                            type="text"
                            className={cx('date-input')}
                            placeholder="DD / MM / YYYY  00:00"
                            value={selectedDate ? formatDate(selectedDate) : ''}
                            readOnly
                            onClick={() => setIsOpen(!isOpen)}
                            name={roundtrip ? (isRoundtripChecked ? inputFormName : '') : inputFormName}
                            onFocus={onValidateErrFocus}
                        />
                    </label>
                </div>

                {isOpen && (roundtrip ? isRoundtripChecked : true) && (
                    <div
                        className={cx('date-picker', {
                            ['roundtrip-picker']: roundtrip,
                        })}
                    >
                        <div className={cx('months-container')}>
                            <MonthCalendar
                                date={currentDate}
                                selectedDate={selectedDate}
                                today={today}
                                onDateSelect={handleDateSelect}
                                showPrevButton={true}
                                onPrevMonth={() => navigateMonth('prev')}
                            />
                            <MonthCalendar
                                date={secondMonthDate}
                                selectedDate={selectedDate}
                                today={today}
                                onDateSelect={handleDateSelect}
                                showNextButton={true}
                                onNextMonth={() => navigateMonth('next')}
                            />
                        </div>
                    </div>
                )}
            </div>

            {validateError && (
                <div className={cx('validate-message')}>
                    <span>{validateError}</span>
                </div>
            )}
        </div>
    );
}

interface MonthCalendarProps {
    date: Date;
    selectedDate?: Date;
    today: Date;
    onDateSelect: (date: Date, isOtherMonth: boolean) => void;
    showPrevButton?: boolean;
    showNextButton?: boolean;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
}

export function MonthCalendar({
    date,
    selectedDate,
    today,
    onDateSelect,
    showPrevButton = false,
    showNextButton = false,
    onPrevMonth,
    onNextMonth,
}: MonthCalendarProps) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const getDaysInMonth = () => {
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);

        // Điều chỉnh để bắt đầu từ Thứ 2
        const dayOfWeek = firstDay.getDay();
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate.setDate(firstDay.getDate() - daysToSubtract);

        const days = [];
        for (let i = 0; i < 42; i++) {
            // 6 hàng x 7 cột
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            days.push(currentDate);
        }
        return days;
    };

    const days = getDaysInMonth();

    const isToday = (date: Date): boolean => {
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (date: Date): boolean => {
        return selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
    };

    const isCurrentMonth = (date: Date): boolean => {
        return date.getMonth() === month && date.getFullYear() === year;
    };

    const isWeekend = (date: Date): boolean => {
        const day = date.getDay();
        return day === 0 || day === 6; // 0 = Chủ nhật, 6 = Thứ 7
    };

    const handleDayClick = (day: Date) => {
        const isOtherMonth = !isCurrentMonth(day);
        onDateSelect(day, isOtherMonth);
    };

    return (
        <div className={cx('month')}>
            <div className={cx('month-header')}>
                {showPrevButton && (
                    <button className={cx('month-nav-btn')} onClick={onPrevMonth} type="button">
                        <div className={cx('chevron-icon')}>
                            <ChevronLeft height="1rem" />
                        </div>
                    </button>
                )}

                <div className={cx('month-title')}>
                    {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>

                {showNextButton && (
                    <button className={cx('month-nav-btn')} onClick={onNextMonth} type="button">
                        <div className={cx('chevron-icon')}>
                            <ChevronRight height="1rem" />
                        </div>
                    </button>
                )}
            </div>

            <div className={cx('weekdays')}>
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
                    <div key={index} className={cx('weekday')}>
                        {day}
                    </div>
                ))}
            </div>

            <div className={cx('days')}>
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={cx('day', {
                            ['other-month']: !isCurrentMonth(day),
                            ['selected']: isSelected(day) && isCurrentMonth(day),
                            ['today']: isToday(day) && !isSelected(selectedDate ?? day) && isCurrentMonth(day),
                            ['weekend']: isWeekend(day) && isCurrentMonth(day),
                        })}
                        onClick={() => handleDayClick(day)}
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(CustomDatePicker);
