import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/future/image";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { useCart } from "../contexts/Cart";
import { Handbag } from "phosphor-react";
import { priceFormatter } from "../utils/formatter";

import { useKeenSlider } from 'keen-slider/react'

import { FooterProduct, HomeContainer, Product } from "../styles/pages/home";

import 'keen-slider/keen-slider.min.css';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  price: number;
  price_format: string;
  defaultPriceId: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {

  const { addProduct } = useCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 'auto',
      spacing: 48
    }
  });

  function handleAddProduct(product: Product) {
    addProduct(product)
  }

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imageUrl} width={520} height={480} alt=""/>

            <FooterProduct>
              <Link href={`/product/${product.id}`} prefetch={false}> 
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price_format}</span>
                </div>
              </Link>
              <button onClick={() => handleAddProduct(product)}>
                <Handbag weight="bold" size={32} />
              </button>
            </FooterProduct>
          </Product>
      ))}

      
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: price.unit_amount / 100,
      price_format: priceFormatter.format(price.unit_amount / 100),
      defaultPriceId: price.id,
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours 
  }
}