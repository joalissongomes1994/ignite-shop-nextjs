/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductData } from '../../types/product'
import { ActionTypes } from './actions'

interface ProductsState {
  products: ProductData[]
}

export function productReducer(
  state: ProductsState,
  action: any,
): ProductsState {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    }

    case ActionTypes.REMOVE_PRODUCT: {
      const newArrayProduct = state.products.filter(
        (product) => product.id !== action.payload.productId,
      )

      return {
        ...state,
        products: newArrayProduct,
      }
    }
  }
}
