import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Products from "../../../models/Products";
import { find } from "../../../services/Services";
import { toastAlert } from "../../../util/toastAlert";
import ProductCardAdmin from "./ProductCardAdmin";

function ProductListAdmin(){
    const [products, setProducts] = useState<Products[]>([]);

  

  const { user } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    findProducts();
  }, []);

  async function findProducts() {
    try {
      await find('/product', setProducts, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('An error occurred while fetching products', 'info');
      }
    }
  }

  useEffect(() => {
    findProducts();
  }, [products.length]);

  return (
    <>
      {products.length === 0 && (
        <div className="container  min-h-screen my-1 flex flex-col justify-center items-center ">
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold mb-2">Nemhum produto encontrado.</h2>
            <p className="text-gray-600">
              Sem produtos disponíveis no momento, Tente em outro momento. 
            </p>
          </div>
        </div>
      )}
      <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 flex flex-wrap">
        {products.map((product) => (
          <ProductCardAdmin key={product.id} product={product} />
        ))}
      </div>
    </>
  );
} 
export default ProductListAdmin