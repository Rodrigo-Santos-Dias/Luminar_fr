import { Link } from 'react-router-dom';
import Products from '../../../models/Products';

interface ProductCardProps {
  product: Products;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col sm:grid-cols-2">
      <div className="flex  w-[300px] h-[400px] bg-[#ece9e9] relative">
        <button className="bg-[#ffde59]  hover:bg-[#F9C23C] absolute bottom-0 w-[300px] p-4">
          Comprar
        </button>
      </div>
      <div className="flex  mt-0 gap-[50px]">
        <p className="font-semibold">{product.name}</p>
        <p className="font-semibold">Estoque: {product.quantity}</p>
      </div>
      <span className="bg-[#220660] w-28 rounded-2xl  px-4 text-white">
        R${product.price},00
      </span>
    </div>
  );
}

export default ProductCard;
