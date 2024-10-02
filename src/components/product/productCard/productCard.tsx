import {useNavigate, useParams} from "react-router-dom";
import Products from "../../../models/Products";

interface CardProductProps {
    product: Products;
  }
 
  
  
  function CardProduct({ product }: CardProductProps) {
    const navigate = useNavigate();
    const  productId  = product.id; 
    function goBack() {
      if (productId == null) {
        navigate('/shopping');
      } else {
        navigate('/shopping', { state: { productId: product.id } });
        console.log(product.id);
      }
    }
    return (
      <div className="flex flex-col sm:grid-cols-2">
      <div className="flex  w-[300px] h-[400px] bg-[#ece9e9] relative">
        <img src={product.image}  className="w-full h-[343px] object-cover" />
        
        <button onClick={goBack} className="bg-[#F9C23C]  hover:bg-[#ffde59] absolute bottom-0 w-[300px] p-4">Comprar</button>
       
      </div>
      <div className='flex  mt-0 gap-[50px]'>
        <p className="font-semibold">{product.name}</p>
        <p className="font-semibold">Estoque: {product.quantity}</p>
        
      </div>
      <span className="bg-[#220660] w-28 rounded-2xl  px-4 text-white">R${product.price}</span>
      
    </div>
    
    );
  }
  
  export default CardProduct;