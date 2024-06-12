import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "./components/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />{" "}
    </ThemeProvider>
  );
}
