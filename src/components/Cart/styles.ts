import { styled } from "../../styles";
import * as AlertDialog from '@radix-ui/react-dialog';

export const Overlay = styled(AlertDialog.Overlay, {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'transparent',
})

export const CloseButton = styled(AlertDialog.Close, {
    position: 'absolute',
    top: 24,
    right: 24,
    background: 'transparent',
    color: '$gray500',
    border: 0,
    cursor: 'pointer',
})

export const Content = styled(AlertDialog.Content, {
    width: '30rem',
    height: '100vh',
    top: 0,
    right: 0,
    padding: '4.5rem 3rem 1.5rem',
    position: 'fixed',
    background: '#202024',
    display: "flex",
    flexDirection: 'column', 
    justifyContent: 'space-between',
    boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

    h2: {
        fontSize: '$lg',
        color: '$gray100',
        marginBottom: '2rem',
    }

});

export const Product = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    color: '$gray300',
    marginBottom: '1.5rem',

    span: {
        fontSize: '$md',
        fontWeight: 'normal',
        display: 'block',
        lineHeight: 1.6,
    },

    strong: {
        fontSize: '$md',
        lineHeight: 1.6,
        display: 'block',
        marginTop: 2,
    },

    button: {
        background: 'transparent',
        color: '$green500',
        border: 0,
        cursor: 'pointer',
        fontSize: '$lg',
        fontWeight: 'bold',
        marginTop: '.5rem',

        '&:hover': {
            color: '$green300',
        }
    }

});

export const ImageContainer = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100% )',
    height: 93,
    width: '100%',
    maxWidth: 101,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    img: {
        objectFit: 'cover',
    }
})

export const Footer = styled('footer', {
    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
        lineHeight: 1.6,

        '&.total': {
            fontSize: '$md',
            fontWeight: 'bold',
            color: '$gray300',
            
            strong: {
                fontSize: '$lg',
                color: '$gray100',
            }
        },
    },

    button: {
        width: '100%',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.2rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$md',
        marginTop: '3.125rem',

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        '&:not(:disabled):hover': {
            backgroundColor: '$green300'
        }
    }
})

export const CartEmpty = styled('div', {
    height: '100%',
    background: '$gray900',
    color: '$gray300',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    borderRadius: 8,
})