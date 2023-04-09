import * as AlertDialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { X } from 'phosphor-react';
import { useCart } from '../../contexts/Cart';
import { CartEmpty, CloseButton, Content, Footer, ImageContainer, Overlay, Product } from './styles';
import { priceFormatter } from '../../utils/formatter';

export function Cart() {
    const { cart, removeProduct, createCheckout, isCreatingCheckoutSession } = useCart();

    const total = cart.reduce((accumulator, currentProduct) => accumulator += currentProduct.price, 0);

    return (
        <AlertDialog.Portal>
            <Overlay />
            <Content>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>
                <div>
                    <AlertDialog.Title>Sacola de compras</AlertDialog.Title>

                    {cart.length > 0 ? (
                        cart.map(product => (
                            <Product key={product.id}>
                                <ImageContainer>
                                    <Image src={product.imageUrl} alt="" height="93px" width="93px"/>
                                </ImageContainer>
                                <div>
                                    <span>{product.name}</span>
                                    <strong>{product.price_format}</strong>
                                    <button onClick={() => removeProduct(product.id)}>Remover</button>
                                </div>
                            </Product>
                        ))
                    ) : (
                        <CartEmpty>
                            <p>Nenhum produto foi adicionado ao carrinho</p>
                        </CartEmpty>
                    )}
                </div>
                <Footer>
                    <div>
                        <span>Quantidade</span>
                        <span>{cart.length} itens</span>
                    </div>
                    <div className='total'>
                        <span>Valor total</span>
                        <strong>{priceFormatter.format(total)}</strong>
                    </div>
                    <button 
                        onClick={createCheckout} 
                        disabled={(cart.length > 0 || !isCreatingCheckoutSession) ? false : true}
                    >
                        Finalizar compra
                    </button>
                </Footer>
            </Content>
        </AlertDialog.Portal>  
    )
}