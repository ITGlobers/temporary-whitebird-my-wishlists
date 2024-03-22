import { useEffect, useState, useContext } from 'react'
import { useProduct } from 'vtex.product-context'
import { ToastContext } from 'vtex.styleguide'

import useBundleMinQuantity from './useBundleMinQuantity'
import useQueryWishlists from './actions/useQueryWishlists'
import useMutationCreateWishlist from './actions/useMutationCreateWishlist'

const useGetWishlist = () => {
  const [listWishlist, setListWishlist] = useState<any>([])
  const [productBundle, setProductBundle] = useState<any>(null)
  const { product, selectedQuantity, selectedItem } = useProduct()
  const { showToast } = useContext<any>(ToastContext)
  const bundle = useBundleMinQuantity(product)

  const { data } = useQueryWishlists()
  const { createWishlist } = useMutationCreateWishlist(() => {})

  useEffect(() => {
    setProductBundle(bundle)
  }, [bundle])

  const nameProduct = product?.productName
  const linkProduct = product?.link
  const idProduct = Number(selectedItem?.itemId)
  const urlImageProduct = product?.items[0]?.images[0]?.imageUrl
  const quantityProduct = selectedQuantity
  const price = Number(product?.priceRange?.sellingPrice?.highPrice)
  const skuCodeReference = product?.items[0]?.referenceId?.[0]?.Value
  const departmentArray = product?.categoryTree
  const department = departmentArray && departmentArray[0]?.name

  const [nameListWishlist, setNameListWishlist] = useState('')
  const [errorName, setErrorName] = useState('')
  const [isButton, setIsButton] = useState(true)
  const [isMessage, setIsMessage] = useState(false)
  const [isShowForm2, setIsShowForm2] = useState(false)
  const [clickCreate, setClickCreate] = useState(false)
  const [isShowSelect, setIsShowSelect] = useState(false)
  const [isShowForm, setIsShowForm] = useState(false)

  useEffect(() => {
    if (data?.getWishlistsByEmail) {
      setListWishlist(data.getWishlistsByEmail)
    }
  }, [data])

  const postCreateList = () => {
    const productObj: any = {
      ID: idProduct,
      Image: urlImageProduct,
      unitValue: price,
      nameProduct,
      linkProduct,
      quantityProduct,
      skuCodeReference,
      department,
    }

    if (productBundle !== 1) {
      productObj.quantityProduct = selectedQuantity * productBundle
      productObj.bundle = productBundle
    }

    createWishlist({
      variables: {
        wishlist: {
          wishlistType: nameListWishlist,
          products: [productObj],
          isPublic: false,
        },
      },
      refetchQueries: ['getWishlists'],
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueNameList = e.target.value

    setNameListWishlist(valueNameList)
  }

  const addList = () => {
    setIsShowForm2(true)
    setClickCreate(true)
  }

  const sendData1 = (e: React.FormEvent) => {
    e.preventDefault()

    if (nameListWishlist.trim() === '') {
      setErrorName('The field cannot be empty')
    } else {
      postCreateList()

      setIsShowForm2(false)
      setNameListWishlist('')
      setClickCreate(false)

      showToast('You created a new Favourite List and your product was added')
      setErrorName('')
    }
  }

  const createLengthZero = () => {
    setIsShowForm(true)
    setIsButton(false)
  }

  const sendData2 = (e: React.FormEvent) => {
    e.preventDefault()

    if (nameListWishlist.trim() === '') {
      setErrorName('The field cannot be empty')
    } else {
      postCreateList()

      setIsShowForm(false)
      setIsButton(false)
      setIsMessage(true)
      setNameListWishlist('')
      setErrorName('')
    }
  }

  useEffect(() => {
    if (isMessage === true) {
      setTimeout(() => {
        setIsMessage(false)
      }, 10000)
    }
  }, [isMessage])

  return {
    listWishlist,
    isButton,
    isMessage,
    isShowForm,
    isShowForm2,
    clickCreate,
    isShowSelect,
    nameListWishlist,
    errorName,
    setIsShowSelect,
    setIsShowForm,
    setIsButton,
    handleChange,
    addList,
    sendData1,
    createLengthZero,
    sendData2,
  }
}

export default useGetWishlist
