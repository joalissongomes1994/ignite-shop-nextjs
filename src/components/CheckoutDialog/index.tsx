import * as Dialog from '@radix-ui/react-dialog'
import {
  ContainerButtonClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  Table,
  Wrapper,
} from '../../styles/components/checkoutDialog'
import { X } from '@phosphor-icons/react'
import { Button } from '../Button'
import { Card } from '../Card'
import { useContext, useState } from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import axios from 'axios'

export const CheckoutDialog = () => {
  const { products } = useContext(ProductContext)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const prices = products.map((product) => {
        return { price: product.defaultPriceId, quantity: 1 }
      })

      const response = await axios.post('/api/checkout', {
        prices,
      })

      const { checkoutUrl } = response.data
      setIsCreatingCheckoutSession(false)
      window.location.href = checkoutUrl
    } catch (error) {
      // connect with an observability tool (Datadog | Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  const totalAmount = products.reduce((acc, cur) => {
    return acc + cur.price
  }, 0)

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <Wrapper>
          <div>
            <ContainerButtonClose>
              <Dialog.Close asChild>
                <X weight="bold" size={24} />
              </Dialog.Close>
            </ContainerButtonClose>

            <DialogTitle>Sacola de compras</DialogTitle>

            {products.length > 0 &&
              products.map((product) => {
                return <Card key={product.id} product={product} />
              })}
          </div>

          {products.length > 0 && (
            <footer>
              <Table>
                <tbody>
                  <tr>
                    <th scope="row">Quantidade</th>
                    <td>
                      {products.length > 1
                        ? `${products.length} itens`
                        : `1 item`}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Valor total</th>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(totalAmount / 100)}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Button
                background="active"
                type="button"
                disabled={isCreatingCheckoutSession}
                onClick={handleBuyProduct}
              >
                Finalizar Compra
              </Button>
            </footer>
          )}
        </Wrapper>
      </DialogContent>
    </Dialog.Portal>
  )
}
