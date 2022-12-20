import { gql } from "@apollo/client";

const CREATE_NEW_USER_MUTATION = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      user: {
        firstName: $firstName
        email: $email
        lastName: $lastName
        password: $password
      }
    ) {
      status
    }
  }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CreatePrivateEvent($auth: String!, $event: EventInput!) {
    createPrivateEvent(auth: $auth, event: $event)
  }
`;
