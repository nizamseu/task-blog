import Layout from "@/Components/Layout/Layout";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === "/dashboard") {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  } else return <Component {...pageProps} />;
}
