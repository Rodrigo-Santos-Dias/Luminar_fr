import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
   
    const handleLogin = () => {
      if (username === 'admin' && password === 'admin123') {
        navigate('/admin-dashboard');
      } else {
        setError('Usuário ou senha incorretos!');
      }
    };
  
    return (
      <div>
        <button
          className="bg-[#FFDE59] text-[#220660] py-2 px-4 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Acessar Admin
        </button>
  
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-2xl mb-4">Login Admin</h2>
              
              {error && <p className="text-red-500 mb-2">{error}</p>}
  
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm mb-1">
                  Usuário:
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-2 border-[#220660] p-2 rounded-md"
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm mb-1">
                  Senha:
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-[#220660] p-2 rounded-md"
                />
              </div>
  
              <button
                onClick={handleLogin}
                className="bg-[#FFDE59] text-[#220660] py-2 px-4 w-full rounded-lg"
              >
                Entrar
              </button>
  
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 text-sm text-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default Admin;


