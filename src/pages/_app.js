import Layout from "@/Components/Layout/Layout";
import Navbar from "@/Components/Navbar/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname == "/dashboard") {
    return (
      <div>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    );
  } else
    return (
      <div>
        <Navbar />
        <Component {...pageProps} />;
      </div>
    );
}
