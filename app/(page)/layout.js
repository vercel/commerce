import styles from './styles.module.scss';

export default function PageLayout({ children }) {
    return (
        <>
            <main className={styles.main}>{children}</main>
        </>
    );
}
