
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { register,update,find } from '../../../services/Services';
import Categories from '../../../models/Categories';
import { AuthContext } from '../../../contexts/AuthContext';


function CategoryForm() {
  const [category, setCategory] = useState<Categories>({} as Categories);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function finById(id: string) {
    await find(`/categories/${id}`, setCategory, {
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

  function updateEstate(e: ChangeEvent<HTMLInputElement>) {
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
        await update(`/categories`, category, setCategory, {
          headers: {
            'Authorization': token
          }
        })

        alert('Category updated successfully')
        hollBack()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('The token has expired, please log in again')
          handleLogout()
        } else {
          alert('Error updating the Theme')
        }

      }

    } else {
      try {
        await register(`/categories`, category, setCategory, {
          headers: {
            'Authorization': token
          }
        })

        alert('Theme registered successfully')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('The token has expired, please log in again')
          handleLogout()
        } else {
          alert('Error when registering the Theme')
        }
      }
    }

    hollBack()
  }

  function hollBack() {
    navigate("/categories")
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
        {id === undefined ? 'Register a new theme' : 'Edit category'}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={generateNewCategory}>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Category description</label>
          <input
            type="text"
            placeholder="Description"
            name='description'
            className="border-2 border-slate-700 rounded p-2"
            value={category.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
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
