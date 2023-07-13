import { gql } from 'apollo-angular'

const GET_PRODUCTS = gql`
  query {
    findAllProducts {
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

const ADD_PRODUCTS = gql`
  mutation addTodo($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      id
      name
      description
    }
  }
`
export {GET_PRODUCTS, ADD_PRODUCTS}
