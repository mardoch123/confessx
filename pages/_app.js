import '../styles/globals.css';
import '../styles/fix-overflow.css';
import { SessionProvider } from 'next-auth/react';
import AppSessionProvider from '../components/SessionProvider';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;