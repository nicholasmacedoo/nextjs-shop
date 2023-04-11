import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { useCart } from "../../contexts/Cart";

import {  ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { priceFormatter } from "../../utils/formatter";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";

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
    
    // const { scene, materials } = useGLTF("/shirt_baked.glb")

    async function handleBuyProduct() {
        addProduct(product)
    }

    return (
        <ProductContainer>
            {/* <Image3dContainer> */}
                {/* <Canvas style={{
                     width: "100%",
                     height: 656,
                }}> */}
                    {/* <group> */}
                        {/* <primitive object={scene} /> */}
                        {/* <mesh geometry={nodes} /> */}
                    {/* </group> */}
                {/* </Canvas> */}
            {/* </Image3dContainer> */}
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