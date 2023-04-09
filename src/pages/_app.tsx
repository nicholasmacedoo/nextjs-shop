import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app";
import { Header } from "../components/Header";
import { CartProvider } from "../contexts/Cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <CartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}


