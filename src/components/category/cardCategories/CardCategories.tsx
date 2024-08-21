import React from 'react'
import { Link } from 'react-router-dom'
import Category from '../../../models/Categories'


interface CardCategoryProps {
  categories: Category
}

function CardCategories({categories}: CardCategoryProps) {
  return (
    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
      <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>Categories</header>
      <p className='p-8 text-3xl bg-slate-200 h-full'>{categories.description}</p>
      <div className="flex">
        <Link to={`/updateCategory/${categories.id}`} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
          <button>Edit</button>
        </Link>
        <Link to={`/deleteCategory/${categories.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
          <button>Delete</button>
        </Link>
      </div>
    </div>
  )
}

export default CardCategories;