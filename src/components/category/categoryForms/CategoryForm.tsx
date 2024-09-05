
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { register,update,find } from '../../../services/Services';
import Categories from '../../../models/Categories';
import { AuthContext } from '../../../contexts/AuthContext';


function CategoryForm() {
  const [category, setCategory] = useState<Categories>({} as Categories);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { name } = useParams<{name: string}>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function finById(id: string) {
    await find(`/category/${id}`, setCategory, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
    finById(id)
    }
  }, [id])

  async function findByName(name: string) {
    await find(`/category/name/${name}}`, setCategory, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (name !== undefined) {
    findByName(name)
    }
  }, [name])


  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })

    console.log(JSON.stringify(category))
  }

  async function generateNewCategory(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await update(`/category`, category, setCategory, {
           headers: {
             'Authorization': token
           }
        }
      )

        alert('Categoria atualizada com sucesso!')
        goBack()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('Seu token expirou, por favor logue novamente!')
          handleLogout()
        } else {
          alert('Erro em categoria')
        }

      }

    } else {
      try {
        await register(`/category`, category , setCategory
           , {
           headers: {
             'Authorization': token
       }
         }
      )

        alert('Categoria registrada novamente!')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('Seu token expirou, por favor logue novamente!')
          handleLogout()
        } else {
          alert('Erro ao registrar uma categoria!')
        }
      }
    }

    goBack()
  }

  function goBack() {
    navigate("/category")
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="container w-full max-w-[700px] flex flex-col items-center justify-center mx-auto  border-2  mt-[40px] p-6 shadow-lg transition-transform duration-500 hover:scale-105">
    <h1 className="text-4xl text-center my-8 ">
      {id === undefined ? 'Registre uma nova categoria' : 'Editar categoria'}
    </h1>
  
    <form className="w-1/2 flex flex-col gap-6" onSubmit={generateNewCategory}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg ">Nome Da categoria</label>
        <input
          type="text"
          placeholder="Nome"
          name='name'
          className="border-2 border-[#220660] rounded-[28px] p-3   transition-all"
          value={category.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-lg ">Descrição</label>
        <input
          type="text"
          placeholder="Descrição"
          name='description'
          className="border-2 border-[#220660] rounded-[28px] p-3  transition-all"
          value={category.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
        />
      </div>
      <button
        className="rounded-[28px] text-slate-100 bg-[#FFDE59] hover:bg-[#FFB800] w-[300px] py-3 mx-auto block shadow-lg transition-colors"
        type="submit"
      >
        {id === undefined ? 'Registrar' : 'Editar'}
      </button>
    </form>
  </div>
  
  );
}

export default CategoryForm;
