import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { useCart } from "../../contexts/Cart";

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { priceFormatter } from "../../utils/formatter";

interface ProductProps {
    product: {
      id: string;
      name: string;
      imageUrl: string;
      url: string;
      price: number;
      price_format: string;
      description: string;
      defaultPriceId: string;
    };
}

export default function Product({ product }: ProductProps) {
    
    const { addProduct } = useCart()

    async function handleBuyProduct() {
        addProduct(product)
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price_format}</span>
                <p>{product.description}</p>
                <button onClick={handleBuyProduct}>
                    Colocar na sacola
                </button>
            </ProductDetails>
        </ProductContainer>
    );
}
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_MToX8Vu9K8AYNa' }}
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                url: product.url,
                price: price.unit_amount / 100,
                price_format: priceFormatter.format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}