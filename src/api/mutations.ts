import { gql } from "@apollo/client";

export const CREATE_PRIVATE_EVENT_MUTATION = gql`
  mutation CreatePrivateEvent($auth: String!, $event: EventInput!) {
    createPrivateEvent(auth: $auth, event: $event) {
      status
      data
      message
    }
  }
`;

export const CREATE_PUBLIC_EVENT_MUTATION = gql`
  mutation CreatePrivateEvent($auth: String!, $event: EventInput!) {
    createPublicEvent(auth: $auth, event: $event) {
      status
      data
      message
    }
  }
`;

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($auth: String!, $event: EventInputUpdate!) {
    updateEvent(auth: $auth, event: $event) {
      status
      message
    }
  }
`;

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($auth: String!, $eventId: String!) {
    deleteEvent(auth: $auth, id: $eventId)
  }
`;

export const CREATE_NEW_USER_MUTATION = gql`
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

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile(
    $auth: String!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    edit(
      auth: $auth
      firstName: $firstName
      email: $email
      lastName: $lastName
    ) {
      status
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($auth: String!) {
    logout(auth: $auth) {
      data
      message
      status
    }
  }
`;

export const CONNECTION_ACTIONS = gql`
  mutation ConnectionActions(
    $action: ConnectionAction!
    $auth: String!
    $connectionId: String!
  ) {
    connectionAction(action: $action, auth: $auth, connectionId: $connectionId)
  }
`;

export const ADD_CONNECTION = gql`
  mutation MakeConnection($auth: String!, $targetUserId: String!) {
    addConnection(auth: $auth, targetUserId: $targetUserId)
  }
`;
