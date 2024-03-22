import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { extractProductData } from '../components/helpers'
import { usePixel } from 'vtex.pixel-manager'
import { useOrderItems } from 'vtex.order-items/OrderItems'

const useAddToCart = () => {
  const { push } = usePixel()
  const { addItems } = useOrderItems()
  const { showToast } = useContext(ToastContext)

  const addProductsToCart = (props, wishlist) => {
    const dataExtract = extractProductData(wishlist)

    const productInfo = dataExtract?.find((item) => props?.name === item?.name)

    const items = [
      {
        id: productInfo.id,
        seller: 1,
        quantity: productInfo.qty,
        name: productInfo.name,
      },
    ]

    try {
      addItems(items).then(async () => {
        push({
          event: 'addToCart',
          id: 'addToCart',
        })
        showToast('Item added to the cart')
      })
    } catch (error) {
      console.error(error)
    }
  }

  return addProductsToCart
}

export default useAddToCart
