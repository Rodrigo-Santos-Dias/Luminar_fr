import Products from "./Products";

export default interface User {
  id: number;
  name: string;
  user: string;
  photo: string;
  password: string;
  products?: Products | null;
}