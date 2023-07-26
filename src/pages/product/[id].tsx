import { GetStaticPaths, GetStaticProps } from "next"
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

interface ProductProps {
  product: {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: string,
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState<boolean>(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } =  response.data

      window.location.href = checkoutUrl

    } catch (error) {
      // connect with an observability tool (Datadog | Sentry)
      
      setIsCreatingCheckoutSession(false)

      alert("Falha ao redirecionar ao checkout!")
    }
    console.log(product.defaultPriceId)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
        
          <button 
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

  const productId = params.id

  const response = await stripe.products.retrieve(productId, {
    expand: ["default_price"]
  })

  const price = response.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: response.id,
        name: response.name,
        imageUrl: response.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: response.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1
  }
}