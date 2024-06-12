import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "../components/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/navbar/Navbar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Navbar />
        <Component {...pageProps} />{" "}
      </ApolloProvider>
    </ThemeProvider>
  );
}
