import { HomeNav, HomeFooter, CartLink } from '/components/home';

import styles from './styles.module.scss';

export default function HomeLayout({ children }) {
    return (
        <>
            {/* <div className={styles.scrollContainer}> */}
            <div className={styles.spacer} />
            <div className={styles.scrollContainer}>
                <CartLink />
            </div>
            <header className={styles.header}>
                <nav>
                    <HomeNav />
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
            <footer>
                <HomeFooter />
            </footer>
            {/* </div> */}
        </>
    );
}
