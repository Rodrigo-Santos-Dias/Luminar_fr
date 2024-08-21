import Products from "./Products";

export default interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  password: string;
  products?: Products | null;
}