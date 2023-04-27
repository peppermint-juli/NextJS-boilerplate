import { gql } from '@apollo/client';

export const USER_INFO = gql`
  query user {
    getUser {
      firstName
      lastName
      email
      privileges {
        runId
        agency
        roles
      }
    }
  }  
`;
