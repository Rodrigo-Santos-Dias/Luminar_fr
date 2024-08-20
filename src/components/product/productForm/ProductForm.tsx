import { useContext, useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Category from "../../../models/Categories";

import { toastAlert } from "../../../util/toastAlert";
import Products from "../../../models/Products";
import { find, update, register } from "../../../services/Services";


function ProductForm() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [categories, setCategories] = useState<Category[]>([]);

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: '',
    description:'',
    
  });

  const [product, setProduct] = useState<Products>({
    id: 0,
    name: '',
    description: '',
    image:'',
    price: 0,
    quantity: 0,
    user: null,
    category: null

  });

  async function findProductById(id: string) {
    await find(`/products/${id}`, setProduct ,{
        headers: {
          Authorization: token,
        },
    });
  }

  async function findCategoryById(id: string) {
    await find(`/categories/${id}`, setCategory , {
        headers: {
          Authorization: token,
        },
      });

  }

  async function findCategories() {
    await find('/categories', setCategories , {
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
      findCategoryById(id);
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
    navigate('/products');
  }

  async function createNewProduct(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ product });

    if (id != undefined) {
      try {
        await update(`/products`, product, setProduct, {
          headers: {
            Authorization: token,
          },
        });
        toastAlert('Produto atualizado com sucesso', 'sucesso');
        goBack();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlert('Erro ao atualizar o Produto', 'erro');
        }
      }
    } else {
      try {
        await register(`/products`, product, setProduct, 
            {
          headers: {
            Authorization: token,
          },
        });

        toastAlert('Produto cadastrado com sucesso', 'sucesso');
        goBack();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlert('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlert('Erro ao cadastrar o Produto', 'erro');
        }
      }
    }
  }

  const carregandoCategoria = category.name === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h1>

      <form onSubmit={createNewProduct} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nome do Produto</label>
          <input
            value={product.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            placeholder="Nome"
            name="name"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Descrição do Produto</label>
          <input
            value={product.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            placeholder="Descrição"
            name="description"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Preço do Produto</label>
          <input
            value={product.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="number"
            placeholder="Preço"
            name="price"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Categoria do Produto</p>
          <select name="category" id="category" className="border p-2 border-slate-800 rounded" onChange={(e) => findCategoryById(e.currentTarget.value)}>
            <option value="" selected disabled>
              Selecione uma categoria
            </option>
            {categories.map((category) => (
              <>
                <option value={category.id}>{category.name}</option>
              </>
            ))}
          </select>
        </div>
        <button disabled={carregandoCategoria} type="submit" className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2">
          {carregandoCategoria ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;