import { ButtonHTMLAttributes, FC, RefObject, forwardRef } from 'react'
import { CustomButton } from '../../styles/components/button'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background: 'active' | 'remove'
}

type Ref =
  | ((instance: HTMLButtonElement | null) => void)
  | RefObject<HTMLButtonElement>
  | null
  | undefined

export const Button: FC<ButtonProps> = forwardRef(function Button(
  { ...props },
  ref: Ref,
) {
  return (
    <CustomButton ref={ref} type="button" {...props}>
      {props.children}
    </CustomButton>
  )
})
