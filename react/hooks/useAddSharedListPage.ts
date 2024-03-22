import { useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useRuntime } from 'vtex.render-runtime'

import useCreateListAccount from './useCreateListAccount'
import { getWishlists } from '../components/helpers'
import { useUserEmail } from './useUserEmail'
import useStoreGlobal from '../globalStore/globalStore'
import useMutationCreateWishlist from './actions/useMutationCreateWishlist'

// eslint-disable-next-line @typescript-eslint/naming-convention
interface useAddSharedListPageProps {
  queryId: string
  products: any
  updatedProducts: any
}

export default function useAddSharedListPage({
  queryId,
  products,
}: useAddSharedListPageProps) {
  // ORDER FORM
  const { orderForm } = useOrderForm()

  // RUNTIME
  const { navigate } = useRuntime()

  // PATH VALIDATION
  const pathname = encodeURIComponent(
    `${window.location.pathname}?id=${queryId}`
  )

  const loginUrl = `/login?returnUrl=${pathname}`

  // STATES
  const [isLoading, setIsLoading] = useState(true)
  const [isListNameInputVisible, setIsListNameInputVisible] = useState<boolean>(
    false
  )

  isLoading

  const { updatedProducts } = useStoreGlobal.getState()

  const { createWishlist } = useMutationCreateWishlist(() => {})

  // CREATE WISH LIST
  const {
    fieldValidationTable,
    nameListAccountTable,
    setFieldValidationTable,
    setNameListAccountTable,
    setIsModalAccountTable,
    handleNameListTable,
  } = useCreateListAccount()

  const setWishlists = useStoreGlobal((state) => state.setWishlists)

  // USER EMAIL
  const userEmail = useUserEmail()
  const fetchData = async () => {
    setIsLoading(true)
    const data = await getWishlists(userEmail)

    setWishlists(data || [])
    setIsLoading(false)
  }

  // EFFECTS
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail])

  // DATA
  const isUserLoggedOut = orderForm.loggedIn === false

  // METHODS
  const navigateToLoginPage = () => {
    navigate({
      to: loginUrl,
    })
  }

  const handleInputListNameVisualization = () => {
    setIsListNameInputVisible((state) => !state)
  }

  const createNewList = async (event) => {
    event.preventDefault()

    if (nameListAccountTable.trim() === '') {
      setFieldValidationTable('The field cannot be empty')
    } else {
      const listProducts: any[] = []

      if (Object.keys(updatedProducts).length > 0) {
        Object.values(updatedProducts).forEach((prod: any) => {
          const newProduct: any = {
            ID: prod.ID,
            Image: prod.Image,
            bundle: prod.bundle,
            unitValue: prod.unitValue,
            linkProduct: prod.linkProduct,
            nameProduct: prod.nameProduct,
            quantityProduct: prod.quantityProduct,
            skuCodeReference: prod.skuCodeReference,
            department: prod.department,
          }

          listProducts.push(newProduct)
        })
      } else {
        products.forEach((prod) => {
          const newProduct: any = {
            ID: prod.id,
            Image: prod.image,
            bundle: prod.bundle,
            unitValue: prod.unitValue,
            linkProduct: prod.linkProduct,
            nameProduct: prod.name,
            quantityProduct: prod.qty,
            skuCodeReference: prod.skuReferenceCode,
            department: prod.department,
          }

          listProducts.push(newProduct)
        })
      }

      await createWishlist({
        variables: {
          wishlist: {
            wishlistType: nameListAccountTable,
            isPublic: false,
            products: listProducts,
          },
        },
      })
      setNameListAccountTable('')
      setFieldValidationTable('')
      setNameListAccountTable(false)
      setIsModalAccountTable(false)
      setIsListNameInputVisible(false)
      navigate({ to: '/account#/my-wishlists' })
    }
  }

  // RETURN
  return {
    isUserLoggedOut,
    navigateToLoginPage,
    isListNameInputVisible,
    handleInputListNameVisualization,
    fieldValidationTable,
    handleNameListTable,
    createNewList,
  }
}
