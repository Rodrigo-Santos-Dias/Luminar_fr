import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';
import { MagnifyingGlass, ShoppingCart } from '@phosphor-icons/react';

import { find } from '../../services/Services';

function Navbar() {
  let navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [searchResults, setSearchResults] = useState([]); // Estado para armazenar os resultados da busca

  function logout() {
    handleLogout();
    alert('User successfully logged out');
    navigate('/login');
  }

  // Função para lidar com a busca
  const handleSearch = async () => {
    try {
      const response = await find(`/product/name/${searchTerm}`, setSearchResults, {
        headers: {
          'Authorization': user.token
        }
      });

      if (response && response.length > 0) {
        setSearchResults(response); // Atualiza o estado com os resultados
        navigate('/productDetails', { state: { product: response[0] } }); // Redireciona para a página de detalhes do produto
      } else {
        console.error('No products found');
        alert('No products found');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  let navbarComponent;

  if (user.token !== "") {
    navbarComponent = (
      <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
        <div className="container flex items-center justify-between">
          {/* Logo aumentada e barra de pesquisa */}
          <div className='flex items-center gap-4'>
            <img src={logo} alt="Luminar logo" className="h-16" /> {/* Logo aumentada */}
            <div className='flex items-center bg-indigo-700 rounded-full px-4 py-2'>
              <MagnifyingGlass size={20} className='text-gray-400' onClick={handleSearch} style={{ cursor: 'pointer' }}/> {/* Clique na lupa para pesquisar */}
              <input 
                type='text' 
                placeholder='Pesquisar produto' 
                className='bg-transparent text-white ml-2 outline-none'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Busca ao pressionar Enter
              />
            </div>
          </div>

          {/* Links de navegação */}
          <div className='flex items-center gap-8'>
            <Link to='/home' className='hover:underline'>Home</Link>
            <Link to='/product' className='hover:underline'>Products</Link>
            <Link to='/registerProduct' className='hover:underline'>Cadastrar Produto</Link>
            <Link to='/registerCategory' className='hover:underline'>Cadastrar Categoria</Link>
            <Link to='/profile' className='hover:underline'>Usuário</Link>
            <ShoppingCart size={24} className='text-white cursor-pointer' />
            <Link to='' onClick={logout} className='hover:underline'>Logout</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;