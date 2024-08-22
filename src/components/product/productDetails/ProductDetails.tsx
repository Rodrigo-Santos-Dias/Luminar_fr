import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { toastAlert } from '../../../util/toastAlert';
import Products from '../../../models/Products';
import CardProduct from '../productCard/productCard';

function ProductDetails() {
  const [product, setProduct] = useState<Products | null>(null);
  const location = useLocation();
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Acessa o produto que foi passado pelo estado na navegação
    const productFromSearch = location.state?.product; // Ajustado para 'product' conforme enviado na navegação

    if (productFromSearch) {
      setProduct(productFromSearch);
    } else {
      toastAlert('Product not found', 'error');
      navigate('/products'); // Redireciona para a página de produtos se o produto não foi encontrado
    }
  }, [location.state, navigate]);

  return (
    <>
      {!product ? (
        <div className="container min-h-screen flex flex-col justify-center items-center">
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold mb-2">Product not found</h2>
            <p className="text-gray-600">
              The product you are looking for is not available. Please check back later or search for another product.
            </p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto my-4">
          <CardProduct product={product} />
        </div>
      )}
    </>
  );
}

export default ProductDetails;
