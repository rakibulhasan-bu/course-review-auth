export interface TUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}