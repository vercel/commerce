import { HomeNav, HomeFooter } from '/components/home';

import styles from './styles.module.scss';

export default function HomeLayout({ children }) {
    return (
        <>
            <header>
                <nav>
                    <HomeNav />
                </nav>
            </header>
            <main className={styles.main}>
                {children}
                <footer>
                    <HomeFooter />
                </footer>
            </main>
        </>
    );
}
