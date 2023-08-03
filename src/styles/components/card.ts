import { styled } from '..'

export const ContainerCard = styled('article', {
  minHeight: '5.875rem',
  marginBottom: '1.5rem',

  display: 'flex',
  gap: '2rem',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 94.79,
  height: 94.79,

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    width: 94,
    height: 94,
    objectFit: 'cover',
  },
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  p: {
    fontSize: '$md',
    color: '$gray300',
  },

  span: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '$lg',
  },

  button: {
    background: 'transparent',
    border: 0,
    padding: 0,
    marginRight: 'auto',
    fontWeight: 'bold',
    color: '$green500',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      color: '$green300',
    },
  },
})
