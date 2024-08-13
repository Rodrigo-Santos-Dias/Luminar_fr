import Category from './Categories';
import User from './Users';

export default interface Products {
  id: number;
  name: string;
  texto: string;
  data: string;
  category: Category | null;
  user: User | null;
}