import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { find, remove } from '../../../services/Services';
import Products from '../../../models/Products';
import { toastAlert } from '../../../util/toastAlert';

function DeleteProduct() {
  const [product, setProduct] = useState<Products>({} as Products);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function findById(id: string) {
    try {
      await find(`/product/${id}`, setProduct, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('Token expired, please log in again', 'info');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('You need to be logged in', 'info');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  function goBack() {
    navigate('/product');
  }

  async function deleteProduct() {
    try {
      await remove(`/product/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toastAlert('Product successfully deleted', 'success');
    } catch (error) {
      toastAlert('Error deleting the product', 'error');
    }

    goBack();
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Delete Product</h1>

      <p className="text-center font-semibold mb-4">
        Are you sure you want to delete the following product?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Product
        </header>
        <div className="p-4">
          <p>{product.id}</p>
          <p className="text-xl h-full">{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={goBack}
          >
            No
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
            onClick={deleteProduct}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
