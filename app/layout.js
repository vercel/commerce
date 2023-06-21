import { TypesNav } from '/components/home.js';

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <nav>
                    <TypesNav />
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
