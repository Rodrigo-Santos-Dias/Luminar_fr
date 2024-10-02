import ProductList from '../../components/product/productList/ProductList';
import { ServiceCard } from '../../components/serviceCard/ServiceCard';
import SimpleCarousel from '../../components/carrosel/SimpleCarousel';
import rodrigo from '../../assets/devs/genfoto.jpg'

export function Home() {
  return (
    <div >
      <div>
        <SimpleCarousel />
      </div>
      <div className="max-w-7xl mx-auto mt-12">
          
          <ProductList />
        </div>
      <div className="flex flex-col mt-4 mb-6">
        <section className="container mx-auto p-8 mt-4 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-[#220660] mt-2 mb-6">Por que nós?</h2>
          <p className="text-lg leading-relaxed text-justify mb-8">
          Nos últimos 10 anos, o preço da energia elétrica no Brasil teve um aumento significativo. Desde 2013, a tarifa residencial mais que dobrou, sendo impactada por diversos fatores como a crise hídrica, o acionamento de termelétricas, além dos impostos que incidem sobre a conta de luz, como ICMS e PIS/Cofins. Entre 2010 e 2021, houve um aumento de cerca de 82% no valor da energia, com períodos críticos de reajustes, como o “tarifaço” de 2015, quando os preços subiram em média 51%.

A seca severa entre 2013 e 2015, a crise hídrica de 2021 e o uso intensivo de termelétricas, que geram energia a custos mais altos, também contribuíram para os reajustes expressivos. A introdução do sistema de bandeiras tarifárias, que ajusta os preços conforme a necessidade de acionamento das termelétricas, tem sido outro fator que pressiona o aumento dos preços nos últimos anos
          </p>
          <h2 className="text-3xl font-semibold text-center text-[#220660] mt-2 mb-6">Nosso Objetivo</h2>
          <p className="text-lg leading-relaxed text-justify mb-8">
          A nossa plataforma tem como objetivo conectar todos os interessados em energia limpa e sustentável, criando um espaço onde empresas, fornecedores e ONGs possam interagir e colaborar na promoção de soluções ecológicas.
          </p>
          
          <h3 className="text-2xl font-semibold text-[#220660] mb-6 text-center">Nossa Equipe</h3>
          <div className="flex flex-wrap justify-center gap-8">
            
            <div className="text-center">
              <a href="https://www.linkedin.com/in/rodrigo-dias-196985236/">
              <img src={rodrigo} alt="Foto da equipe" className="rounded-full mx-auto mb-4 shadow-lg h-[150px]" />
              <h4 className="text-xl font-semibold text-[#220660]">Rodrigo Dias</h4>
              <p className="text-gray-600"> Dev fullstack</p>
              </a>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/150" alt="Foto da equipe" className="rounded-full mx-auto mb-4 shadow-lg" />
              <h4 className="text-xl font-semibold text-[#220660]">Henrique </h4>
              <p className="text-gray-600">Especialista em Energias Renováveis</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
