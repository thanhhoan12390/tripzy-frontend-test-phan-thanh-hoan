import classNames from 'classnames/bind';

import BusFormContent from '~/components/features/BusFormContent/BusFormContent';
import { BusIcon, PlaneIcon, HotelIcon } from '~/components/ui/Icons';
import Tabs from '~/components/ui/Tabs/Tabs';
import styles from './Homepage.module.scss';

const cx = classNames.bind(styles);

function Homepage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('home-title')}>
                <h1 className={cx('heading')}>Travel Smarter, Not Harder</h1>
                <h4 className={cx('heading-text')}>
                    Make every trip effortless. Tripzy lets you book rides and plan journeys with ease
                </h4>
            </div>

            <Tabs
                tabsTitleData={[
                    {
                        titleText: 'Bus & Shuttle',
                        icon: <BusIcon height="1.6rem" width="1.6rem" />,
                        activeColor: '#EBF9FF',
                        iconBgColor: '#D3F3FF',
                        iconColor: '#19C0FF',
                    },
                    {
                        titleText: 'Hotel & Accommodation',
                        icon: <HotelIcon height="1.5rem" width="1.5rem" />,
                        activeColor: '#F4FFEB',
                        iconBgColor: '#E8FBCC',
                        iconColor: '#447A11',
                    },
                    {
                        titleText: 'Flight',
                        icon: <PlaneIcon height="1.4rem" width="1.7rem" />,
                        activeColor: '#EBF4FF',
                        iconBgColor: '#E1EDFE',
                        iconColor: '#5664E1',
                    },
                ]}
                tabsContent={[<BusFormContent key="bus-form-content" />, null, null]}
            />
        </div>
    );
}

export default Homepage;
