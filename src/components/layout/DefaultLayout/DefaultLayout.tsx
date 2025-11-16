import classNames from 'classnames/bind';
import { Fragment } from 'react';

import { Logo } from '~/components/ui/Icons';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
    children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <header className={cx('header')}>
                    <div className={cx('logo-group')}>
                        <div className={cx('logo')}>
                            <Logo width="2.2rem" height="2.2rem" />
                        </div>
                        <span>Tripzy</span>
                    </div>
                </header>
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('banner-overlay')} />
        </Fragment>
    );
}

export default DefaultLayout;
