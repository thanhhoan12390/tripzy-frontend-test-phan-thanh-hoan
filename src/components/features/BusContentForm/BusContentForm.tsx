'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';

import CustomDatePicker from '~/components/ui/CustomDatePicker/CustomDatePicker';
import LocationAutocomplete from '~/components/ui/LocationAutocomplete/LocationAutocomplete';
import InputNumber from '~/components/ui/InputNumber/InputNumber';
import { submitForm } from '~/lib/actions';
import { SearchIcon, TransferIcon } from '~/components/ui/Icons';
import styles from './BusContentForm.module.scss';

const cx = classNames.bind(styles);

function BusContentForm() {
    const [fromDeparture, setFromDeparture] = useState<string>();
    const [toDeparture, setToDeparture] = useState<string>();
    const [selectedStartDate, setSelectedStartDate] = useState<Date>();
    const [selectedRoundtripDate, setSelectedRoundtripDate] = useState<Date>();
    const [isRoundtripChecked, setIisRoundtripChecked] = useState<boolean>(false);
    const [passengerNo, setPassengerNo] = useState(1);
    const [errors, setErrors] = useState<{
        from?: string[];
        to?: string[];
        startDate?: string[];
        passenger?: string[];
        roundtripDate?: string[];
    }>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); //  ngăn refresh page

        const formData = new FormData(e.currentTarget);
        const result = await submitForm(formData);

        if (!result?.success) {
            setErrors(result?.errors ?? {});
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={cx('inputs-wrapper')}>
                <div className={cx('locations-group')}>
                    <LocationAutocomplete
                        heading="FROM"
                        value={fromDeparture}
                        onChange={setFromDeparture}
                        locationInputName="from-location"
                        validateError={errors.from ? errors.from[0] : ''}
                        onValidateErrFocus={() => {
                            setErrors((pre) => ({
                                ...pre,
                                from: [],
                            }));
                        }}
                    />
                    <div className={cx('icon-wrapper')}>
                        <TransferIcon />
                    </div>
                    <LocationAutocomplete
                        heading="TO"
                        value={toDeparture}
                        onChange={setToDeparture}
                        locationInputName="to-location"
                        validateError={errors.to ? errors.to[0] : ''}
                        onValidateErrFocus={() => {
                            setErrors((pre) => ({
                                ...pre,
                                to: [],
                            }));
                        }}
                    />
                </div>

                <div className={cx('date-group')}>
                    <CustomDatePicker
                        inputFormName="start-date"
                        onDateSelect={setSelectedStartDate}
                        selectedDate={selectedStartDate}
                        validateError={errors.startDate ? errors.startDate[0] : ''}
                        onValidateErrFocus={() => {
                            setErrors((pre) => ({
                                ...pre,
                                startDate: [],
                            }));
                        }}
                        pickerId="departure-date"
                    />

                    <CustomDatePicker
                        roundtrip
                        isRoundtripChecked={isRoundtripChecked}
                        onRoundtripChange={setIisRoundtripChecked}
                        inputFormName="roundtrip-date"
                        onDateSelect={setSelectedRoundtripDate}
                        selectedDate={selectedRoundtripDate}
                        validateError={errors.roundtripDate ? errors.roundtripDate[0] : ''}
                        onValidateErrFocus={() => {
                            setErrors((pre) => ({
                                ...pre,
                                roundtripDate: [],
                            }));
                        }}
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

export default BusContentForm;
