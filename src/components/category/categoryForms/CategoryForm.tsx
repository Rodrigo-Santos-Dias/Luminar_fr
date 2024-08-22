
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
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

        alert('Category updated successfully')
        goBack()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('The token has expired, please log in again')
          handleLogout()
        } else {
          alert('Error category')
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

        alert('Category registered successfully')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('The token has expired, please log in again')
          handleLogout()
        } else {
          alert('Error when registering the Category ')
        }
      }
    }

    goBack()
  }

  function goBack() {
    navigate("/categoriy")
  }

  useEffect(() => {
    if (token === '') {
      alert('You need to be logged in');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? 'Register a new category' : 'Edit category'}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={generateNewCategory}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Category description</label>
          <input
            type="text"
            placeholder="Name"
            name='name'
            className="border-2 border-slate-700 rounded p-2"
            value={category.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
          type="submit"
        >
          {id === undefined ? 'Register' : 'Edit'}
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;
