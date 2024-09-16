import backgroundImage from '../../assets/luminar-background.png';
import finance from '../../assets/financeiro.png';
import economy from '../../assets/economia.png';
import sustainable from '../../assets/sustentavel.png';
import ProductList from '../../components/product/productList/ProductList';
import { ServiceCard } from '../../components/serviceCard/ServiceCard';
import SimpleCarousel from '../../components/carrosel/SimpleCarousel';


export function Home() {
  return (
    <div>
      <div>
        <SimpleCarousel/>
      </div>

      
      <div className="flex flex-col mt-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-left text-3xl font-bold">Lançamentos</h2>
          <ProductList />
        </div>
      </div>

    </div>
  );
}