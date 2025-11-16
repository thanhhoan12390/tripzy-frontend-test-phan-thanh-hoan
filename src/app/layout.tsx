import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from '@ant-design/nextjs-registry';
// import 'antd/dist/reset.css';

import DefaultLayout from '~/components/layout/DefaultLayout';
import '~/styles/globals.scss';

const nunitoSans = Nunito_Sans({
    variable: '--font-nunito-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Tripzy Frontend Test',
    description: 'Tripzy frontend test',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${nunitoSans.variable}`}>
                <AntdRegistry>
                    <DefaultLayout>{children}</DefaultLayout>
                </AntdRegistry>
            </body>
        </html>
    );
}
