import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Category from '../../../models/Categories'
import { AuthContext } from '../../../contexts/AuthContext'
import { find ,remove } from '../../../services/Services'




function DeleteCategory() {
    const [category, setCategory] = useState<Category>({} as Category)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { user, handleLogout } = useContext(AuthContext)
    const token = user.token

    async function findById(id: string) {
        try {
            await find(`/category/${id}`, setCategory, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('The token has expired, please try again')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('You need to be logged')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    function hollBack() {
        navigate("/categories")
    }

    async function deleteCategory() {
        try {
            await remove(`/category/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Category deleted successfully')

        } catch (error) {
            alert('Error when deleting the Category')
        }

        hollBack()
    }
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Delete Category</h1>

            <p className='text-center font-semibold mb-4'>Are you sure you want to delete the following category?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Category</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{category.description}</p>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={hollBack}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deleteCategory}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCategory
