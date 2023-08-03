import { styled } from '..'

export const CustomButton = styled('button', {
  marginTop: 'auto',
  width: '100%',
  background: '$green500',
  color: '$gray300',
  border: 0,
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  variants: {
    background: {
      active: {
        backgroundColor: '$green500',
        color: '$gray100',
        '&:hover': {
          backgroundColor: '$green300',
        },
      },
      remove: {
        backgroundColor: '$red500',
        color: '$gray100',
        '&:hover': {
          backgroundColor: '$red300',
        },
      },
    },
  },
})

export const IconButton = styled('button', {
  padding: '0.75rem',
  border: 0,
  borderRadius: 6,
  background: '$gray800',
  color: '$gray300',
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  variants: {
    color: {
      active: { color: '$gray100' },
    },
    background: {
      active: { background: '$green500' },
    },
  },

  span: {
    background: '$green500',
    color: '$gray100',
    display: 'flex',
    width: '24px',
    height: '24px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: '50%',
    border: '3px solid $gray900',
    fontWeight: 'bold',
    fontSize: '0.75rem',

    position: 'absolute',
    top: -7,
    right: -7,
  },
})
