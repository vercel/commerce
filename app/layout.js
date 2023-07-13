import localFont from 'next/font/local';

import '/styles/global.scss';
import styles from './styles.module.scss';

const CenturyNovaSB = localFont({
    src: [
        {
            path: '../fonts/CenturyNovaSBRoman/font.woff',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../fonts/CenturyNovaSBItalic/font.woff',
            weight: '300',
            style: 'italic',
        },
    ],
    variable: '--font-century-nova',
});
const Dia = localFont({
    src: [
        {
            path: '../fonts/DiaRegular/Dia Regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/DiaLight/Dia Light.woff',
            weight: '100',
            style: 'normal',
        },
    ],
    variable: '--font-dia',
});

export default function RootLayout({ children }) {
    return (
        <html lang='en' className={`${CenturyNovaSB.variable} ${Dia.variable}`}>
            <body className={styles.body}>{children}</body>
        </html>
    );
}
