import styles from './styles.module.scss';

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={styles.body}>{children}</body>
        </html>
    );
}
