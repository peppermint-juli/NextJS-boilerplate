export interface User {
  id: string,
  email: string,
  firstName?: string,
  lastName?: string,
  privileges: Privilege[]
}

export interface Privilege {
  runId: string,
  roles: ROLE[]
}

export enum ROLE {
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER'
}

export const privilegesConstructor = (payload: any): Privilege => (
  {
    runId: payload.run_id,
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