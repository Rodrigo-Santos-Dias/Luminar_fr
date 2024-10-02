import { useContext, useEffect, useState } from "react";
import { find } from "../../services/Services";
import { AuthContext } from "../../contexts/AuthContext";
import Products from "../../models/Products";
import { useLocation, useNavigate } from "react-router-dom"; // Importando o useNavigate

function ShoppingCart() {
  const location = useLocation();
  const navigate = useNavigate(); // Definindo o hook useNavigate
  const productId = location.state?.productId;
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const { user } = useContext(AuthContext);
  const [donationMessage, setDonationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  let institutions = [
    { name: "Instituto Solar Social", url: "https://www.institutosolarsocial.org.br/" },
    { name: "Revolusolar", url: "https://www.revolusolar.org.br/" },
    { name: "Projeto Ilumina", url: "https://projetoilumina.com.br/" },
    { name: "Instituto Ecológico Aqualung", url: "http://www.aqualung.org.br/" },
    { name: "Litro de Luz Brasil", url: "https://www.litrodeluz.com.br/" }
  ];
  
  const token = user.token;

  useEffect(() => {
    async function findProductById(id: string) {
      await find(`/product/${id}`, setSelectedProduct, {
        headers: {
          Authorization: token,
        },
      });
    }

    if (productId) {
      findProductById(productId);
    }
  }, [productId, token]);

  // Função chamada ao clicar no botão "Finalizar Compra"
  const handlePurchase = () => {
    if (selectedProduct) {
      const donationAmount = (selectedProduct.price * 0.15).toFixed(2); // 15% do preço do produto
      const institution = institutions[Math.floor(Math.random() * institutions.length)];
      const message = `R$ ${donationAmount} foi doado para ${institution.name}. Conheça mais sobre o trabalho deles no link abaixo.`;
      setDonationMessage(message);
      setShowModal(true);
    }
  };
  

  // Função para fechar o modal e redirecionar para a página inicial
  const handleClose = () => {
    setShowModal(false);
    navigate("/home"); // Redireciona para a página inicial ("/")
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mb-8">Carrinho de Compras</h1>

      <div className="bg-white shadow-lg p-8 border border-[#220660] rounded-[28px]">
        <div className="flex flex-col gap-4">
          {selectedProduct ? (
            <>
              <div className="flex justify-between items-center border-b border-[#220660] pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-24 h-24 rounded-[28px] object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{selectedProduct.name}</h2>
                    <p className="text-sm text-slate-700">{selectedProduct.description}</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-900">R$ {selectedProduct.price}</div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Resumo do Pedido</h2>
                <div className="flex justify-between mb-4">
                  <p className="text-slate-700">Total</p>
                  <p className="text-lg font-bold text-slate-900">R$ {selectedProduct.price}</p>
                </div>
              </div>

              {/* Botão de Finalizar Compra */}
              <button 
                className="rounded-[28px] bg-[#FFDE59] hover:bg-[#F9C23C] text-black font-bold py-2 px-4 w-full transition-colors duration-300"
                onClick={handlePurchase} // Função chamada no clique
              >
                Finalizar Compra
              </button>

              {/* Modal de Doação */}
              {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-[28px] shadow-lg">
      <p className="text-lg font-bold text-slate-900">{donationMessage}</p>
      <a
        href={institutions.find(inst => donationMessage.includes(inst.name))?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mt-4 block"
      >
        Clique aqui para conhecer mais sobre a instituição.
      </a>
      <button
        onClick={handleClose}
        className="mt-4 rounded-[28px] bg-[#FFDE59] hover:bg-[#F9C23C] text-black font-bold py-2 px-4 w-full transition-colors duration-300"
      >
        Fechar
      </button>
    </div>
  </div>
)}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Seu carrinho está vazio</h2>
              <p className="text-slate-700">Adicione produtos ao carrinho para continuar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
