import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { useCart } from "../../contexts/Cart";

import { Image3dContainer, ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { priceFormatter } from "../../utils/formatter";

import { Suspense } from "react";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const ComponentTshirt = dynamic(() => import("../../components/Tshirt").then(load => load.Tshirt), {
    ssr: false,
})

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
            <Image3dContainer>
                <Suspense fallback={<strong style={{ color: "white" }}>carrengando..</strong>}>
                    <Canvas
                        dpr={[1, 2]}
                        style={{
                            width: '100%',
                            maxWidth: 520
                        }}
                        shadows
                    >

                        <ComponentTshirt decalImage="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png" scale={6.5} />
                    </Canvas>
                </Suspense>
            </Image3dContainer>
            {/* <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
            </ImageContainer> */}
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
            { params: { id: 'prod_MToX8Vu9K8AYNa' } }
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