import { gql } from "@apollo/client";

export type ApiEventType = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: "PRIVATE" | "PUBLIC";
  id: string;
  userId: string;
};

export const GET_MY_EVENTS = gql`
  query myEvents($auth: String!, $from: String!, $to: String!) {
    myEvents(auth: $auth, fromDate: $from, toDate: $to) {
      title
      description
      type
      startDate
      endDate
      id
      userId
    }
  }
`;

export type ConnectionType = {
  connectionStatus: "PENDING" | "ACCEPTED" | "REJECTED";
  firstName: string;
  id: string;
  lastName: string;
  userId: string;
};

export type Connections = {
  connections: {
    connections: ConnectionType[];
  };
};

export const GET_CONNECTION_REQUESTS = gql`
  query ConnectionRequests($auth: String!) {
    connectionRequests(auth: $auth) {
      connections {
        id
        firstName
        lastName
        userId
        createdAt
      }
    }
  }
`;

export const GET_CONNECTION_REQUESTS_SENT = gql`
  query ConnectionRequestsSent($auth: String!) {
    connectionRequestsSent(auth: $auth) {
      connections {
        userId
        firstName
        id
        lastName
        createdAt
      }
    }
  }
`;

export const GET_MY_CONNECTIONS = gql`
  query MyConnections($auth: String!) {
    connections(auth: $auth) {
      connections {
        firstName
        id
        lastName
        userId
      }
    }
  }
`;

export type ApiUserType = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  createdAt: string;
};

export const GET_USER = gql`
  query GetUser($auth: String!, $userId: String!) {
    user(auth: $auth, id: $userId) {
      email
      firstName
      id
      lastName
      createdAt
    }
  }
`;

export const NOT_CONNECTED_USERS = gql`
  query NotConnectedUsers($auth: String!) {
    notConnectedUsers(auth: $auth) {
      email
      firstName
      id
      lastName
      createdAt
    }
  }
`;

export const GET_NOT_CONNECTED_USERS = gql`
  query GetUsers($auth: String!) {
    getNotConnectedUsers(auth: $auth) {
      email
      id
      firstName
      lastName
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($auth: String!) {
    users(auth: $auth) {
      email
      id
      firstName
      lastName
      createdAt
    }
  }
`;
