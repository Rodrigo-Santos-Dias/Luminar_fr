
import { Link } from 'react-router-dom'
import Category from '../../../models/Categories'


interface CardCategoryProps {
  categories: Category
}

function CardCategories({categories}: CardCategoryProps) {
  return (
        <div className='border border-[#220660] flex  grid-cols-1 lg:grid-cols-2 h-screen bg-white" flex-col rounded-2xl overflow-hidden justify-between'>
          <header className='py-2 px-6 bg-[#220660] text-white font-bold text-2xl'>{categories.name}</header>
          <p className='p-8 text-3xl bg-[#FEFEFE] h-full'>{categories.name}</p>
          <div className="flex">
            <Link to={`/updateCategory/${categories.id}`} className='w-full text-black bg-[#FFDE59] hover:bg-[#F9C23C] flex items-center justify-center py-2 transition-colors duration-300'>
              <button>Edit</button>
            </Link>
            <Link to={`/deleteCategory/${categories.id}`} className='text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center py-2 transition-colors duration-300'>
              <button>Delete</button>
            </Link>
          </div>
        </div>
  )
}

export default CardCategories;