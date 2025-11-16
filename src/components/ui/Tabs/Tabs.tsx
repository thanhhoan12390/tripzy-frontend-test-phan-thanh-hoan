'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Tabs.module.scss';

const cx = classNames.bind(styles);

interface TabsProps {
    tabsTitleData: {
        titleText: string;
        icon: React.ReactNode;
        iconColor: string;
        iconBgColor: string;
        activeColor: string;
    }[];
    tabsContent: React.ReactNode[];
}

function Tabs({ tabsTitleData, tabsContent }: TabsProps) {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tabs-title-container')}>
                {tabsTitleData.map((item, index) => (
                    <div
                        style={
                            tabIndex === index
                                ? { backgroundColor: item.activeColor }
                                : { backgroundColor: 'transparent' }
                        }
                        key={index}
                        className={cx('tab-title')}
                        onClick={() => setTabIndex(index)}
                    >
                        <div
                            style={{ color: item.iconColor, backgroundColor: item.iconBgColor }}
                            className={cx('title-icon-wrapper')}
                        >
                            {item.icon}
                        </div>
                        <div className={cx('title-text')}>{item.titleText}</div>
                    </div>
                ))}
            </div>

            <div className={cx('tabs-content-wrapper')}>
                <div className={cx('tab-content')}>
                    {tabsContent[tabIndex] ?? <div className={cx('no-content')}>No data</div>}
                </div>
            </div>
        </div>
    );
}

export default Tabs;
