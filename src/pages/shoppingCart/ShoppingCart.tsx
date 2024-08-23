import React from 'react';

function ShoppingCart() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mb-8">Carrinho de Compras</h1>

      <div className="bg-white shadow-lg p-8 border border-[#220660] rounded-[28px]">
        <div className="flex flex-col gap-4">
          {/* Item 1 */}
          <div className="flex justify-between items-center border-b border-[#220660] pb-4">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Produto 1"
                className="w-24 h-24 rounded-[28px] object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900">Produto 1</h2>
                <p className="text-sm text-slate-700">Descrição breve do produto.</p>
              </div>
            </div>
            <div className="text-lg font-bold text-slate-900">R$ 100,00</div>
          </div>

          {/* Item 2 */}
          <div className="flex justify-between items-center border-b border-[#220660] pb-4">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Produto 2"
                className="w-24 h-24 rounded-[28px] object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900">Produto 2</h2>
                <p className="text-sm text-slate-700">Descrição breve do produto.</p>
              </div>
            </div>
            <div className="text-lg font-bold text-slate-900">R$ 200,00</div>
          </div>

          {/* Resumo do Pedido */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Resumo do Pedido</h2>
            <div className="flex justify-between mb-4">
              <span className="text-slate-700">Subtotal</span>
              <span className="text-lg font-bold text-slate-900">R$ 300,00</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-700">Frete</span>
              <span className="text-lg font-bold text-slate-900">R$ 20,00</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-700">Total</span>
              <span className="text-lg font-bold text-slate-900">R$ 320,00</span>
            </div>
          </div>

          {/* Botão de Finalizar Compra */}
          <button className="rounded-[28px] bg-[#FFDE59] hover:bg-[#F9C23C] text-black font-bold py-2 px-4 w-full transition-colors duration-300">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;