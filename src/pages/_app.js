import "@/styles/globals.css";
import "../styles/home.css";
import "../styles/tasklist.css";
import React from "react";
import "../styles/taskform.css";
import "../styles/searchbar.css";

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
