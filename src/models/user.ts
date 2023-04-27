import { Privilege, User } from '../graphql/typings';

export const privilegesConstructor = (payload: any): Privilege => (
  {
    runId: payload.run_id,
    agency: payload.agency,
    roles: payload.roles
  }
);

export const userConstructor = (payload: any): User => (
  {
    id: payload.id,
    email: payload.email,
    firstName: payload.first_name,
    lastName: payload.last_name,
    privileges: (payload.privileges as any[]).map(p => privilegesConstructor(p))
  }
);