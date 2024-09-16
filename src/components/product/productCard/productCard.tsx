import { Link } from "react-router-dom";
import Products from "../../../models/Products";

interface CardProductProps {
    product: Products;
  }

  
  
  
  function CardProduct({ product }: CardProductProps) {
    return (
      <div className="flex flex-col sm:grid-cols-2">
      <div className="flex  w-[300px] h-[400px] bg-[#ece9e9] relative">
        <img src={product.image}  className="w-full h-[250px] object-cover" />
        <button className="bg-[#F9C23C]  hover:bg-[#ffde59] absolute bottom-0 w-[300px] p-4">Comprar</button>
        <Link to={`/editProduct/${product.id}`} className='w-full text-black bg-[#FFDE59] mt-[300px] h-[50px] hover:bg-[#F9C23C] flex items-center justify-center py-2 transition-colors duration-300'>
              <button>Edit</button>
      </Link>
      <Link to={`/deleteProduct/${product.id}`} className='text-white bg-red-400 h-[50px] mt-[300px] hover:bg-red-700 w-full flex items-center justify-center'>
            <button>Delete</button>
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
  
  export default CardProduct;