import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

async function Search({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-content')}>
                <div className={cx('search-data-field')}>From:&nbsp;{params.from}</div>
                <div className={cx('search-data-field')}>To:&nbsp;{params.to}</div>
                <div className={cx('search-data-field')}>Departure date:&nbsp;{params.dep}</div>
                <div className={cx('search-data-field')}>Return date:&nbsp;{params.ret}</div>
                <div className={cx('search-data-field')}>No. of passenger:&nbsp;{params.pax}</div>
            </div>
        </div>
    );
}

export default Search;
