'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';

import CustomDatePicker from '~/components/ui/CustomDatePicker/CustomDatePicker';
import LocationAutocomplete from '~/components/ui/LocationAutocomplete/LocationAutocomplete';
import InputNumber from '~/components/ui/InputNumber/InputNumber';
import { submitForm } from '~/lib/actions';
import { SearchIcon, TransferIcon } from '~/components/ui/Icons';
import styles from './BusFormContent.module.scss';

const cx = classNames.bind(styles);

function BusFormContent() {
    const [fromDeparture, setFromDeparture] = useState<string>();
    const [toDeparture, setToDeparture] = useState<string>();
    const [selectedStartDate, setSelectedStartDate] = useState<Date>();
    const [selectedRoundtripDate, setSelectedRoundtripDate] = useState<Date>();
    const [isRoundtripChecked, setIisRoundtripChecked] = useState<boolean>(false);
    const [passengerNo, setPassengerNo] = useState(1);

    // async function handleSubmit(formData: FormData) {}

    return (
        <form action={submitForm}>
            <div className={cx('inputs-wrapper')}>
                <div className={cx('locations-group')}>
                    <LocationAutocomplete
                        heading="FROM"
                        value={fromDeparture}
                        onChange={setFromDeparture}
                        locationInputName="from-location"
                    />
                    <div className={cx('icon-wrapper')}>
                        <TransferIcon />
                    </div>
                    <LocationAutocomplete
                        heading="TO"
                        value={toDeparture}
                        onChange={setToDeparture}
                        locationInputName="to-location"
                    />
                </div>

                <div className={cx('date-group')}>
                    <CustomDatePicker
                        inputFormName="start-date"
                        onDateSelect={setSelectedStartDate}
                        selectedDate={selectedStartDate}
                        pickerId="departure-date"
                    />

                    <CustomDatePicker
                        roundtrip
                        isRoundtripChecked={isRoundtripChecked}
                        onRoundtripChange={setIisRoundtripChecked}
                        inputFormName="roundtrip-date"
                        onDateSelect={setSelectedRoundtripDate}
                        selectedDate={selectedRoundtripDate}
                        pickerId="roundtrip-date"
                    />
                </div>

                <InputNumber
                    value={passengerNo}
                    min={1}
                    step={1}
                    onChange={setPassengerNo}
                    inputNumberName="number-passenger"
                />
            </div>

            <div className={cx('button-container')}>
                <button className={cx('submit-btn')} type="submit">
                    <SearchIcon />
                    Search
                </button>
            </div>
        </form>
    );
}

export default BusFormContent;
