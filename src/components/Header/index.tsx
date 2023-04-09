import { useCart } from "../../contexts/Cart";
import Image from 'next/future/image'
import Link from "next/link";
import logoImg from '../../assets/logo.svg';
import * as AlertDialog from '@radix-ui/react-dialog';

import { Handbag } from "phosphor-react";

import { BadgeCart, HeaderContainer } from "./styles";
import { Cart } from "../Cart";


export function Header() {
    const { cart, toggleCart } = useCart()

    return (
        <HeaderContainer>
            <Link href="/">
                <Image src={logoImg} alt="" />
            </Link>
            
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <button onClick={toggleCart}>
                        <Handbag size={24}/>
                        {cart.length > 0 && (
                        <BadgeCart>{cart.length}</BadgeCart>
                        )}
                    </button>
                </AlertDialog.Trigger>
                <Cart />
            </AlertDialog.Root>
        </HeaderContainer>
    )
}