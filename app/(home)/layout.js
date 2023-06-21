import { TypesNav } from '/components/home.js';

export default function HomeLayout({ children }) {
    return (
        <>
            <header>
                <nav>
                    <TypesNav />
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
