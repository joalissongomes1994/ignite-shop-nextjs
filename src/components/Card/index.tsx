import Image from 'next/image'
import {
  ContainerCard,
  Content,
  ImageContainer,
} from '../../styles/components/card'
import { ProductData } from '../../types/product'
import { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'

interface CardProps {
  product: ProductData
}

export const Card = ({ product }: CardProps) => {
  const { removeProduct } = useContext(ProductContext)

  function handleRemoveProduct() {
    removeProduct(product.id)
  }

  return (
    <ContainerCard>
      <ImageContainer>
        <Image src={product.imageUrl} width={94} height={94} alt="" />
      </ImageContainer>

      <Content>
        <p>{product.name}</p>

        <span>{product.formattedPrice}</span>

        <button onClick={handleRemoveProduct} type="button">
          Remover
        </button>
      </Content>
    </ContainerCard>
  )
}
