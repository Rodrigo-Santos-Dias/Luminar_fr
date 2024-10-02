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

      toastAlert('Produto excluído com sucesso', 'success');
    } catch (error) {
      toastAlert('Ocorreu um erro ao tentar excluir o produto', 'error');
    }

    goBack();
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Produto</h1>

      <p className="text-center font-semibold mb-4">
        Quer mesmo deletar este produto?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between mb-24">
        <header className="py-2 px-6 bg-indigo-900 text-white font-bold text-2xl">
          {product.name}
        </header>
        <div className="p-4">
        <div className='flex justify-center'><img src={product.image}className="w-64 h-64 object-cover border-2 border-[#220660] rounded-lg" /></div>
          <p className='flex justify-center'>Descrição: {product.description}</p>
          <p className='flex justify-center' >Preço: R${product.price}</p>
          
        </div>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={goBack}
          >
            Cancelar
          </button>
          <button
            className="w-full text-slate-100 bg-[#FFDE59] hover:bg-[#F9C23C] flex items-center justify-center"
            onClick={deleteProduct}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
