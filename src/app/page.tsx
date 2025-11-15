'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';

import CustomDatePicker from '~/components/CustomDatePicker/CustomDatePicker';
import LocationAutocomplete from '~/components/LocationAutocomplete/LocationAutocomplete';
import InputNumber from '~/components/InputNumber/InputNumber';
import { submitForm } from '~/lib/actions';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

export default function ExamplePage() {
    const [fromDeparture, setFromDeparture] = useState<string>();
    const [toDeparture, setToDeparture] = useState<string>();
    const [selectedStartDate, setSelectedStartDate] = useState<Date>();
    const [selectedRoundtripDate, setSelectedRoundtripDate] = useState<Date>();
    const [isRoundtripChecked, setIisRoundtripChecked] = useState<boolean>(false);
    const [passengerNo, setPassengerNo] = useState(1);

    // const handleSubmit = (formData: FormData) => {
    //     const fromLocation = formData.get('from-location');
    //     const toLocation = formData.get('to-location');
    //     const startDate = formData.get('start-date');
    //     const roundtripDate = formData.get('roundtrip-date');
    //     const noOfPassenger = formData.get('number-passenger');

    //     console.log('form data: ', { fromLocation, toLocation, startDate, roundtripDate, noOfPassenger });
    // };

    console.log(selectedStartDate, selectedRoundtripDate, fromDeparture, toDeparture, passengerNo);

    return (
        <form action={submitForm}>
            <div className={cx('wrapper')}>
                <LocationAutocomplete
                    heading="FROM"
                    value={fromDeparture}
                    onChange={setFromDeparture}
                    locationInputName="from-location"
                />

                <LocationAutocomplete
                    heading="TO"
                    value={toDeparture}
                    onChange={setToDeparture}
                    locationInputName="to-location"
                />

                <CustomDatePicker
                    inputFormName="start-date"
                    onDateSelect={setSelectedStartDate}
                    selectedDate={selectedStartDate}
                />

                <CustomDatePicker
                    roundtrip
                    isRoundtripChecked={isRoundtripChecked}
                    onRoundtripChange={setIisRoundtripChecked}
                    inputFormName="roundtrip-date"
                    onDateSelect={setSelectedRoundtripDate}
                    selectedDate={selectedRoundtripDate}
                />

                <InputNumber
                    value={passengerNo}
                    min={1}
                    step={1}
                    onChange={setPassengerNo}
                    inputNumberName="number-passenger"
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}
