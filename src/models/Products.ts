import Category from './Categories';
import User from './Users';

export default interface Products {
  id: number;
  name: string;
  description: string;
  quantity:number;
  price:number;
  image: string;
  category: Category | null;
  user: User | null;
}