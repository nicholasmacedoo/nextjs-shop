import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    url: string;
    price: number;
    price_format: string;
    defaultPriceId: string;
}
interface CartContextProps {
    cart: Product[]
    isCreatingCheckoutSession: boolean
    addProduct: (product: Product) => void
    removeProduct: (id: string) => void
    createCheckout: () => Promise<void>
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

const CART_STORAGE_KEY = '@ignite-shop:cart-v:1.0.0';

export function CartProvider({ children }: CartProviderProps) {

    const [cart, setCart] = useState<Product[]>([]);
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);


    function addProduct(product: Product) {
        const newCart = [...cart, product];

        setCart(newCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart))
    }

    function removeProduct(id: string) {
        const updateCart = cart.filter(product => product.id !== id);
        
        setCart(updateCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updateCart))
    }

    function clearCart() {
        setCart([])
        localStorage.removeItem(CART_STORAGE_KEY);
    }
    
    async function createCheckout() {

        if(!cart) return;
        
        try {
            setIsCreatingCheckoutSession(true)
            const pricesId = cart.map(product => product.defaultPriceId);

            const response = await axios.post('/api/checkout', {
                prices: pricesId,
            });

            const { checkoutSessionUrl } = response.data
            
            clearCart()
            
            window.location.href = checkoutSessionUrl
        } catch (err) {
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    useEffect(() => {
        const storageCart = localStorage.getItem(CART_STORAGE_KEY);

        if(storageCart) {
            setCart(JSON.parse(storageCart));
        }
    }, []);

    return (
        <CartContext.Provider 
            value={{ 
                cart,
                isCreatingCheckoutSession,
                addProduct,
                removeProduct,
                createCheckout
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    
    return context;
}