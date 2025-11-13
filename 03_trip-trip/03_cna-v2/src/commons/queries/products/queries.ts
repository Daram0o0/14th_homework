import { gql } from '@apollo/client'

export const FETCH_TRAVEL_PRODUCTS_OF_THE_BEST = gql`
  query fetchTravelproductsOfTheBest {
    fetchTravelproductsOfTheBest {
      _id
      name
      contents
      images
      pickedCount
      price
    }
  }
`

export const FETCH_TRAVEL_PRODUCTS = gql`
  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      contents
      images
      pickedCount
      price
      tags
      seller {
        _id
        name
        picture
      }
      soldAt
      createdAt
    }
  }
`

export const TOGGLE_TRAVEL_PRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`

export const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        _id
        address
        addressDetail
        lat
        lng
        zipcode
      }
      seller {
        _id
        name
        picture
      }
      soldAt
      createdAt
      updatedAt
    }
  }
`

export const FETCH_TRAVEL_PRODUCTS_I_PICKED = gql`
  query fetchTravelproductsIPicked {
    fetchTravelproductsIPicked {
      _id
    }
  }
`

export const DELETE_TRAVEL_PRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`
