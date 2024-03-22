// Hooks
import React, { useEffect } from 'react'
import { Spinner, Button } from 'vtex.styleguide'

import useCreateListAccount from '../hooks/useCreateListAccount'
import { useUserEmail } from '../hooks/useUserEmail'
// Global Store
import useStoreGlobal from '../globalStore/globalStore'
// Components
import Wishlist from './Wishlist'
import ModalCreateList from './ModalCreateList'
// Helpers
import { createWishlist } from './helpers'
import useQueryWishlists from '../hooks/actions/useQueryWishlists'
// Styles
import styles from '../styles.css'

const MyWishLists = () => {
  const { setSelectedWishlist, selectedWishlist } = useStoreGlobal()
  const setWishlists = useStoreGlobal((state) => state.setWishlists)
  const wishlists = useStoreGlobal((state) => state.wishlists)

  const { data, loading, refetch } = useQueryWishlists()

  const userEmail = useUserEmail()

  const {
    isModalAccount,
    nameListAccount,
    fieldValidation,
    setNameListAccount,
    setFieldValidation,
    setIsModalAccount,
    buttonModal,
    buttonCloseModal,
    handleNameList,
  } = useCreateListAccount()

  useEffect(() => {
    if (
      data &&
      data.getWishlistsByEmail &&
      data.getWishlistsByEmail.length > 0
    ) {
      setWishlists(data.getWishlistsByEmail)

      if (!selectedWishlist) {
        setSelectedWishlist(data.getWishlistsByEmail[0].id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // Create list post
  const handleSubmitData = (event) => {
    event.preventDefault()

    if (nameListAccount.trim() === '') {
      setFieldValidation('The field cannot be empty')
    } else {
      createWishlist(userEmail, nameListAccount, () => refetch())
      setNameListAccount('')
      setFieldValidation('')
      setIsModalAccount(false)
    }
  }

  if (loading) return <Spinner />

  if (wishlists.length === 0) {
    return (
      <section className={styles.wishlistCreateWishlistUI}>
        <Button href="/account/#/profile">RETURN</Button>
        <h1>Create your wishlist!</h1>
        <button className={styles.wishlistCreateNew} onClick={buttonModal}>
          New Wishlist
        </button>
        {isModalAccount && (
          <ModalCreateList
            buttonCloseModal={buttonCloseModal}
            handleNameList={handleNameList}
            fieldValidation={fieldValidation}
            handleSubmitData={handleSubmitData}
          />
        )}
      </section>
    )
  }

  return <Wishlist wishlists={wishlists} fetchData={async () => refetch()} />
}

export default MyWishLists
