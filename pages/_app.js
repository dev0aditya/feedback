// _app.js

import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
