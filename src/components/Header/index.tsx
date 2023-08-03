import Link from 'next/link'
import { Container } from '../../styles/components/header'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { Handbag } from '@phosphor-icons/react'
import { CheckoutDialog } from '../CheckoutDialog'

import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import { IconButton } from '../../styles/components/button'
import { DialogTrigger } from '../../styles/components/checkoutDialog'

import logoImg from '../../assets/logo.svg'

export function Header() {
  const { products } = useContext(ProductContext)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (products.length === 0 && isOpen) {
      setIsOpen(false)
    }
  }, [isOpen, products.length])

  return (
    <Container>
      <Link href="/">
        <Image src={logoImg} width={130} height={52} alt="" />
      </Link>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild disabled={products.length === 0}>
          <IconButton>
            <Handbag size={24} weight="bold" />
            {products.length > 0 && <span>{products.length}</span>}
          </IconButton>
        </DialogTrigger>

        <CheckoutDialog />
      </Dialog.Root>
    </Container>
  )
}
