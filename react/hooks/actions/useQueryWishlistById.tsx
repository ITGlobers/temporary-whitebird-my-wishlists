/* eslint-disable max-params */
import { useQuery } from 'react-apollo'

import GET_WISHLIST from '../../graphql/queries/getWishlistById.gql'

const useQueryWishlistById = (id: string, callback: (data: any) => void) => {
  const { refetch } = useQuery(GET_WISHLIST, {
    skip: !id,
    variables: { id },
    onCompleted: (data) => {
      callback(data)
    },
    fetchPolicy: 'network-only',
  })

  return {
    refetch,
  }
}

export default useQueryWishlistById
