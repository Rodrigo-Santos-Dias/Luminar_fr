import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';
import { MagnifyingGlass, ShoppingCart } from '@phosphor-icons/react';



function Navbar() {
  let navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar a Sidebar

  function logout() {
    handleLogout();
    alert('User successfully logged out');
    navigate('/login');
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  let navbarComponent;

  if (user.token !== "") {
    navbarComponent = (
      <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
        <div className="container flex items-center justify-between">
          {/* Logo aumentada e barra de pesquisa */}
          <div className="flex items-center gap-4">
            <Link to={'/home'}>
              <img src={logo} alt="Luminar logo" className="h-16" /> {/* Logo aumentada */}
            </Link>
            <div className="hidden md:flex items-center bg-indigo-700 rounded-full px-4 py-2">
              <MagnifyingGlass size={20} className="text-gray-400" style={{ cursor: 'pointer' }} />
              <input
                type="text"
                placeholder="Pesquisar produto"
                className="bg-transparent text-white ml-2 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Ícone do menu hambúrguer para telas pequenas */}
          <div className="md:hidden">
            <button onClick={toggleSidebar}>
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Links de navegação visíveis em telas médias e grandes */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/product" className="hover:text-[#FFDE59]">Produtos</Link>
            <Link to="/registerProduct" className="hover:text-[#FFDE59]">Cadastrar Produto</Link>
            <Link to="/admin-dashboard" className="hover:text-[#FFDE59]">Admin</Link>
            <Link to="/registerCategory" className="hover:text-[#FFDE59]">Cadastrar Categoria</Link>
            <Link to="/shopping" className="hover:text-[#FFDE59]">
              <ShoppingCart size={24} className="text-white cursor-pointer hover:text-[#FFDE59]" />
            </Link>
            <Link to="" onClick={logout} className="hover:text-[#FFDE59]">Logout</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {navbarComponent}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-indigo-900 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={closeSidebar} className="text-white">
            &times;
          </button>
        </div>
        <nav className="flex flex-col p-4">
          <Link to="/product" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>Products</Link>
          <Link to="/registerProduct" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>Cadastrar Produto</Link>
          <Link to="/registerCategory" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>Cadastrar Categoria</Link>
          <Link to="/shopping" className="hover:text-[#FFDE59] py-2" onClick={closeSidebar}>
            Compras
          </Link>
          <Link to="" onClick={() => { closeSidebar(); logout(); }} className="hover:text-[#FFDE59] py-2">Logout</Link>
        </nav>
      </div>

      {/* Background overlay when Sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
}

export default Navbar;