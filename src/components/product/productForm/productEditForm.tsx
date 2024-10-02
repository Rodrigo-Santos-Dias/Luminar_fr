import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Category from '../../../models/Categories';

import { toastAlert } from '../../../util/toastAlert';
import Products from '../../../models/Products';
import { find, update, register } from '../../../services/Services';

function ProductForm() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [categories, setCategories] = useState<Category[]>([]);

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: '',
    description: '',
  });

  const [product, setProduct] = useState<Products>({
    id: 0,
    name: '',
    description: '',
    image:'',
    price: 0,
    quantity: 0,
    user: null,
    category: null,
  });

  async function findProductById(id: string) {
    await find(`/product/${id}`, setProduct, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findCategoryById(id: string) {
    await find(`/category/${id}`, setCategory, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findCategories() {
    await find('/category', setCategories, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    findCategories();
    if (id !== undefined) {
      findProductById(id);
      console.log(category);
    }
  }, [id]);

  useEffect(() => {
    setProduct({
      ...product,
      category: category,
    });
  }, [category]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      category: category,
    });
  }

  function goBack() {
    navigate('/product');
  }

  async function createNewProduct(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ product });

    if (id != undefined) {
      try {
        await update(`/product`, product, setProduct, {
          headers: {
            Authorization: token,
          },
        });
        toastAlert('Produto atualizado com sucesso', 'sucess');
        goBack();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlert('Erro ao atualizar o Produto', 'error');
        }
      }
    } else {
      try {
        await register(`/product`, product, setProduct, {
          headers: {
            Authorization: token,
          },
        });

        toastAlert('Produto cadastrado com sucesso', 'sucess');
        goBack();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlert('Erro ao cadastrar o Produto', 'error');
        }
      }
    }
  }

  const carregandoCategoria = category.name === '';

  return (
<div className="container w-full max-w-[700px] flex flex-col items-center justify-center mx-auto border-4 border-[#220660] rounded-[28px] mt-[40px] p-6 shadow-lg shadow-[#220660]/50 transition-transform duration-500 hover:scale-105">
  <h1 className="text-4xl text-center my-8">
    {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
  </h1>

  <form onSubmit={createNewProduct} className="w-full flex flex-col gap-6 border-4 border-[#220660] rounded-[28px] p-4 shadow-lg shadow-[#220660]/50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nome do Produto */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg">Nome do Produto</label>
        <input
          value={product.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          type="text"
          placeholder="Nome do Produto"
          id="name"
          name="name"
          required
          className={`border-2 border-[#220660] rounded-[28px] p-3 transition-all ${
            product.name ? 'input-success' : 'input-error'
          }`}
        />
      </div>

      {/* Descrição do Produto */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-lg">Descrição do Produto</label>
        <input
          value={product.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          type="text"
          placeholder="Ex: Produto de alta qualidade"
          id="description"
          name="description"
          required
          className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
        />
      </div>

      {/* Quantidade em Estoque */}
      <div className="flex flex-col gap-2">
        <label htmlFor="quantity" className="text-lg">Quantidade em Estoque</label>
        <input
          value={product.quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          type="number"
          placeholder="Ex: 100 unidades"
          id="quantity"
          name="quantity"
          min="0"
          required
          className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
        />
      </div>

      {/* Preço do Produto */}
      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="text-lg">Preço do Produto</label>
        <input
          value={product.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          type="number"
          placeholder="Ex: 500.00"
          id="price"
          name="price"
          min="0"
          required
          className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
        />
      </div>

      {/* Categoria do Produto */}
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-lg">Categoria do Produto</label>
        <select
          name="category"
          id="category"
          className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
          onChange={(e) => findCategoryById(e.currentTarget.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione uma categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Imagem do Produto */}
      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="text-lg">Imagem do Produto</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image"
          className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
        />
      </div>
    </div>

    {/* Botão de submissão */}
    <button
      disabled={carregandoCategoria}
      type="submit"
      className="rounded-[28px] disabled:bg-slate-200 bg-[#FFDE59] hover:bg-[#FFB800] w-[300px] py-3 mx-auto block shadow-lg transition-colors hover:scale-105"
    >
      {carregandoCategoria ? (
        <span>Carregando...</span>
      ) : id !== undefined ? (
        'Editar'
      ) : (
        'Cadastrar'
      )}
    </button>
  </form>
</div>


  );
}

export default ProductForm;
