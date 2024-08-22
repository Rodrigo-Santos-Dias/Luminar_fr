import backgroundImage from '../../assets/luminar-background.svg';
import finance from '../../assets/financeiro.svg';
import economy from '../../assets/economia.svg';
import sustainable from '../../assets/sustentavel.svg';
import { ServiceCard } from '../../components/serviceCard/ServiceCard';
import ProductList from '../../components/product/productList/ProductList';

export function Home() {
  return (
    <div>
      <div
        className="bg-cover h-[500px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="flex flex-col mt-32">
        <h1 className="text-6xl text-center font-semibold mb-24">
          Conheça os benefícios da energia solar
        </h1>

        <div className="flex justify-center gap-16 mb-32">
          <ServiceCard
            image={finance}
            title="Retorno Financeiro"
            text="Retorno financeiro extraordinário com payback super atrativo."
          />

          <ServiceCard
            image={economy}
            title="Economia"
            text="Economia de até 95% em sua conta de energia."
          />

          <ServiceCard
            image={sustainable}
            title="Sustentável"
            text="Energia limpa, gratuita, renovável e não poluente."
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-left text-3xl font-bold">Lançamentos</h2>
          <ProductList />
        </div>

        {/* <div className="max-w-7xl mx-auto">
          <h2 className="text-left text-3xl font-bold">Destaques Sale</h2>
          <div className="grid grid-cols-4 gap-8 mt-8">
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </div>
        </div> */}
      </div>
    </div>
  );
}
