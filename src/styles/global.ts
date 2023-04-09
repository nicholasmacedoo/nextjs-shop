import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        outline: 0,
        boxSizing: 'border-box'
    },

    body: {
        '-webkit-font-smothing': 'antialiased',
        backgroundColor: '$gray900',
        color: '$gray100',
        overflow: 'hidden'
    },

    'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    },
})