import { Link } from "react-router-dom";
import Products from "../../../models/Products";
import { useState } from "react";


interface CardProductProps {
    product: Products;
  }

function ProductCardAdmin({product}:CardProductProps){
    const [products, setProducts] = useState<Products[]>([]);
  return (
    <div className="flex flex-col sm:grid-cols-2">
    <div className="flex  w-[300px] h-[400px] bg-[#ece9e9] relative">
      <img src={product.image}  className="w-full h-[341px] object-cover absolute" />
      <Link to={`/editProduct/${product.id}`} className='w-full  text-black bg-[#FFDE59] mt-[343px] h-[57px] hover:bg-[#F9C23C] flex items-center justify-center py-2 transition-colors duration-300'>
            <button>Editar</button>
    </Link>
    <Link to={`/deleteProduct/${product.id}`} className='text-white  bg-red-400 h-[57px] mt-[343px] hover:bg-red-700 w-full flex items-center justify-center '>
          <button>Deletar</button>
        </Link>
    </div>
    <div className='flex  mt-0 gap-[50px]'>
      <p className="font-semibold">{product.name}</p>
      <p className="font-semibold">Estoque: {product.quantity}</p>
      
    </div>
    <span className="bg-[#220660] w-28 rounded-2xl  px-4 text-white">R${product.price},00</span>
    
  </div>
  
  );
}
 export default ProductCardAdmin