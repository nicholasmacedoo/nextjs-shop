import { styled } from "../../styles";

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    button: {
        backgroundColor: '$gray800',
        border: 0,
        color: '$gray300',
        borderRadius: 8,
        padding: '0.75rem',
        cursor: 'pointer',
        position: 'relative',

        '&:not(:disabled):hover': {
            filter: 'brightness(0.8)'
        },
    }
});

export const BadgeCart = styled('span', {
    height: 24,
    width: 24,
    borderRadius: 48,
    backgroundColor: '$green500',
    color: '$white',
    fontWeight: 'bold',
    position: 'absolute',
    top: -7,
    right: -7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid $gray900'
})