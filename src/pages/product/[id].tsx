import { GetStaticPaths, GetStaticProps } from 'next'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import { useContext } from 'react'
import Head from 'next/head'
import { ProductContext } from '../../contexts/ProductContext'
import { ProductData } from '../../types/product'
import { Button } from '../../components/Button'

interface ProductProps {
  product: ProductData
}

export default function Product({ product }: ProductProps) {
  const { products, addProduct, removeProduct } = useContext(ProductContext)

  const title = `${product.name} | Ignite Shop`
  const hasThisProduct = products.findIndex((item) => item.id === product.id)

  function handleAddProduct() {
    if (hasThisProduct < 0) {
      addProduct({
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
        formattedPrice: product.formattedPrice,
        defaultPriceId: product.defaultPriceId,
      })
    }
  }

  function handleRemoveProduct() {
    removeProduct(product.id)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            priority
            alt=""
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <Button
            background={hasThisProduct < 0 ? 'active' : 'remove'}
            onClick={
              hasThisProduct < 0 ? handleAddProduct : handleRemoveProduct
            }
          >
            {hasThisProduct < 0 ? 'Colocar na sacola' : 'Remover da sacola'}
          </Button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = response.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: response.id,
        name: response.name,
        imageUrl: response.images[0],
        formattedPrice: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        price: Number(price.unit_amount),
        description: response.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  }
}
