import classNames from 'classnames/bind';

import BusFormContent from '~/components/features/BusFormContent/BusFormContent';
import styles from './page.module.scss';

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
            <div style={{ height: '11rem' }}></div>
            <BusFormContent />
        </div>
    );
}

export default Homepage;
