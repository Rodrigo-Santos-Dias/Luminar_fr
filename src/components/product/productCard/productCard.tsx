import { Link } from "react-router-dom";
import Products from "../../../models/Products";

interface CardProductProps {
    product: Products;
  }
  
  function CardProduct({ product }: CardProductProps) {
    return (
      <div className='border-slate-900 border flex flex-col rounded overflow-hidden justify-between'>
        <div>
          <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
            
            <h3 className='text-lg font-bold text-center uppercase'>{product.name}</h3>
          </div>
          <div className='p-4'>
            <h4 className='text-lg font-semibold uppercase'>Price: ${product.price}</h4>
            <p>Description: {product.description}</p>
            <p>Category: {product.category?.name}</p>
          </div>
        </div>
        <div className="flex">
          <Link to={`/editProduct/${product.id}`} className='w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
            <button>Edit</button>
          </Link>
          <Link to={`/deleteProduct/${product.id}`} className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
            <button>Delete</button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default CardProduct;