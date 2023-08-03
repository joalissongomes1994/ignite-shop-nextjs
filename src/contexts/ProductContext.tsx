import { ReactNode, createContext, useReducer } from 'react'
import { productReducer } from '../reducers/products/reducer'
import { ProductData } from '../types/product'
import {
  addProductAction,
  removeProductAction,
} from '../reducers/products/actions'

interface ProductContextProviderProps {
  children: ReactNode
}

interface ProductContextType {
  products: ProductData[]
  addProduct: (product: ProductData) => void
  removeProduct: (productId: string) => void
}

export const ProductContext = createContext({} as ProductContextType)

export function ProductContextProvider({
  children,
}: ProductContextProviderProps) {
  const [productState, dispatch] = useReducer(productReducer, {
    products: [],
  })

  const { products } = productState

  function addProduct(product: ProductData) {
    dispatch(addProductAction(product))
  }

  function removeProduct(productId: string) {
    dispatch(removeProductAction(productId))
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
