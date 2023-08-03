import { ProductData } from '../../types/product'

export enum ActionTypes {
  'ADD_PRODUCT' = 'ADD_PRODUCT',
  'REMOVE_PRODUCT' = 'REMOVE_PRODUCT',
}

export function addProductAction(newProduct: ProductData) {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload: newProduct,
  }
}

export function removeProductAction(productId: string) {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: {
      productId,
    },
  }
}
