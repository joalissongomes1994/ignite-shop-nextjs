import Link from 'next/link'
import { ImageContainer, SuccessContainer } from '../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
  quantity: number
}

export default function Success({
  customerName,
  products,
  quantity,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <div>
          {products.map((product, index) => (
            <ImageContainer key={index}>
              <Image src={product.imageUrl} width={140} height={140} alt="" />
            </ImageContainer>
          ))}
        </div>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>
            {quantity > 1 ? `${quantity} camisetas` : `${quantity} camiseta`}
          </strong>{' '}
          já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  let quantity = 0

  const customerName = session.customer_details.name
  const products = session.line_items.data.map((item) => {
    quantity += item.quantity

    const product = item.price.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images.length ? product.images[0] : '',
    }
  })

  return {
    props: {
      customerName,
      products,
      quantity,
    },
  }
}
