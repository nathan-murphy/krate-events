export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permissions: { canHost: boolean; isAdmin: boolean, canRSVPFor: string };
}
