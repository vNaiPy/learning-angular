import { gql } from 'apollo-angular'

const GET_PRODUCTS = gql`
  query {
    findAllProducts {
        id,
        name,
        description,
        price,
        imgUrl,
        status,
        store {
            name
        },
        categories {
            id,
            name
        }
    }
  }
`

const GET_PRODUCTS_BY_ID = gql`
query findByProductId ($id: ID){
  findByProductId (id: $id) {
    id,
    name,
    description,
    price,
    imgUrl,
    status,
    store {
        name
    },
    categories {
        id,
        name
    }
  }
}
`
const GET_STORE_BY_CURRENT_USER_ID = gql`
query {
  findStoreByCurrentUser {
      name,
      logoUrl,
      bannerUrl,
      instant
  }
}
`

const ADD_PRODUCTS = gql`
  mutation addTodo($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      id
      name
      description
    }
  }
`

const STORE_REGISTRATION = gql`
  mutation storeRegistration($name: String!,
                            $logoUrl: String!,
                            $bannerUrl: String!,
                            $street: String!,
                            $complement: String!,
                            $neighborhood: String!,
                            $city: String!,
                            $state: String!,
                            $country: String!,
                            $longitude: Float!,
                            $latitude: Float!
  ) {
    storeRegistration(store: {
      name: $name,
      logoUrl: $logoUrl,
      bannerUrl: $bannerUrl,
      address: {
        street: $street,
        complement: $complement,
        neighborhood: $neighborhood,
        city: $city
        state: $state,
        country: $country,
        longitude: $longitude,
        latitude: $latitude
      }
    })
    {
      name
      logoUrl
      bannerUrl
      instant,
      address {
          longitude,
          latitude
      }
    }
  }
`

const SEARCH_PRODUCTS_BY_LOCATION = gql`
  mutation storeRegistration($searchingFor: String!,
                            $lng: Float!,
                            $lat: Float!
  ) {
    storeRegistration(searchingFor: $searchingFor, lng: $lng, lat: $lat)
    {
      name,
        description,
        price,
        imgUrl,
        status,
        store {
            name,
            address {
                longitude
                latitude
            }
        },
        categories {
            id,
            name
        }
    }
  }
`
export {GET_PRODUCTS, GET_PRODUCTS_BY_ID, GET_STORE_BY_CURRENT_USER_ID, ADD_PRODUCTS, STORE_REGISTRATION, SEARCH_PRODUCTS_BY_LOCATION}
