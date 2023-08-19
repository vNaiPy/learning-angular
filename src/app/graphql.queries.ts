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
export {GET_PRODUCTS, GET_PRODUCTS_BY_ID, GET_STORE_BY_CURRENT_USER_ID, ADD_PRODUCTS}
