import * as Dialog from '@radix-ui/react-dialog'
import { keyframes, styled } from '..'

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50, -50) scale(.9)' },
  '100%': { opacity: 1, transform: 'translate(-50, -50) scale(1)' },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const DialogTrigger = styled(Dialog.Trigger, {
  '&:disabled': {
    cursor: 'not-allowed',
  },
})

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$gray800',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '90vw',
  height: '100%',
  maxWidth: '30rem',
  animation: `${contentShow} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
})

export const Wrapper = styled('div', {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: '1.5rem',
})

export const ContainerButtonClose = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',

  svg: {
    color: '$gray500',
    cursor: 'pointer',
    transition: 'all .2s ease',

    '&:hover': {
      color: '$gray300',
    },
  },
})

export const DialogTitle = styled(Dialog.Title, {
  fontWeight: 'bold',
  color: '$gray100',
  fontSize: '$xl',
  marginBottom: '2rem',
})

export const Table = styled('table', {
  width: '100%',
  marginBottom: '2rem',

  th: {
    textAlign: 'left',
  },

  td: {
    textAlign: 'right',
  },

  'td, th': {
    lineHeight: 1.6,
  },

  tr: {
    '&:nth-child(1)': {
      'th, td': {
        color: '$gray300',
        fontWeight: 'lighter',
      },
    },

    '&:nth-child(2)': {
      'th, td': {
        color: '$green100',
        fontWeight: 'bold',
        fontSize: '1.125rem',
      },
    },
  },
})
