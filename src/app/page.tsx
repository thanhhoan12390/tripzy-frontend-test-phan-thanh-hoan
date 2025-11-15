'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';

import CustomDatePicker from '~/components/CustomDatePicker/CustomDatePicker';

import styles from './page.module.scss';
import LocationAutocomplete from '~/components/LocationAutocomplete/LocationAutocomplete';

const cx = classNames.bind(styles);

export default function ExamplePage() {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [location, setLocation] = useState<string>();

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        console.log('Ngày đã chọn:', date.toLocaleDateString('en-US'));
    };

    console.log(location);

    return (
        <div className={cx('wrapper')}>
            {/* <CustomDatePicker inputFormName="start-date" onDateSelect={handleDateSelect} selectedDate={selectedDate} />
            <CustomDatePicker
                roundtrip
                inputFormName="end-date"
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
            /> */}
            <LocationAutocomplete
                heading="FROM"
                value={location}
                onChange={setLocation}
                locationInputName="from-location"
            />

            {/* <LocationAutocomplete
                heading="TO"
                value={location}
                onChange={setLocation}
                locationInputName="from-location"
            /> */}
        </div>
    );
}
