import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Category from '../../../models/Categories';
import { toastAlert } from '../../../util/toastAlert';
import Products from '../../../models/Products';
import { find, update, register } from '../../../services/Services';

import imageInstal1 from '../../../util/images/instalação/instalação-800x450.jpg';
import imageInstal2 from '../../../util/images/instalação/blog-manuntencao.png';
import imageInstal3 from '../../../util/images/instalação/install.jpg';

import kit1 from '../../../util/images/kitPainel/kit.jpg';
import kit2 from '../../../util/images/kitPainel/painel-solar-a-venda_12493_4447441670418925849_cover.jpg';
import kit3 from '../../../util/images/kitPainel/kit_energia_solar_fotovoltaico_0900wp_24vcc.jpg';
import kit4 from '../../../util/images/kitPainel/kitPainél.png';

import limpeza from '../../../util/images/limpeza/kitlimpeza2.jpg';
import manutencao1 from '../../../util/images/manutencao/cleansolarpanel-980x459.jpg';
import manutencao2 from '../../../util/images/manutencao/manutencao-usinas-solares-3.jpg';


function ProductForm() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({ id: 0, name: '', description: '' });

  // Lista de imagens
  const images = [kit1, kit2, kit3, kit4, imageInstal1, imageInstal2, imageInstal3, limpeza, manutencao1, manutencao2];

  // Estado para armazenar a imagem selecionada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [product, setProduct] = useState<Products>({
    id: 0,
    name: '',
    description: '',
    image: '',  // O campo 'image' é onde o caminho da imagem será salvo
    price: 0,
    quantity: 0,
    user: null,
    category: null,
  });

  // Função para buscar o produto pelo ID
  async function findProductById(id: string) {
    await find(`/product/${id}`, setProduct, {
      headers: { Authorization: token },
    });
  }

  // Função para buscar as categorias
  async function findCategories() {
    await find('/category', setCategories, {
      headers: { Authorization: token },
    });
  }

  useEffect(() => {
    if (token === '') {
      toastAlert('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    findCategories();
    if (id !== undefined) {
      findProductById(id);
    }
  }, [id]);

  // Atualiza o estado do produto ao selecionar a imagem ou a categoria
  useEffect(() => {
    setProduct({
      ...product,
      category: category,
      image: selectedImage || product.image,  // Salva o caminho da imagem selecionada
    });
  }, [category, selectedImage]);

  // Atualiza o estado do produto ao preencher os campos de input
  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  // Função para voltar para a página de produtos
  function goBack() {
    navigate('/product');
  }

  // Função que manipula a seleção de uma imagem
  function handleImageSelect(image: string) {
    setSelectedImage(image);  // Define a imagem selecionada
  }

  // Função para criar ou atualizar o produto
  async function createNewProduct(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (id !== undefined) {
        await update(`/product`, product, setProduct, {
          headers: { Authorization: token },
        });
        toastAlert('Produto atualizado com sucesso', 'sucesso');
      } else {
        await register(`/product`, product, setProduct, {
          headers: { Authorization: token },
        });
        toastAlert('Produto cadastrado com sucesso', 'sucesso');
        console.log(product.image)
      }
      goBack();
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('O token expirou, favor logar novamente', 'info');
        handleLogout();
      } else {
        toastAlert('Erro ao processar o Produto', 'erro');
      }
    }
  }

  return (
    <div className="container w-full max-w-[700px] flex flex-col items-center justify-center mx-auto border-2 mt-[40px] mb-[50px] p-6 shadow-lg transition-transform duration-500 hover:scale-105">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
      </h1>

      <form onSubmit={createNewProduct} className="w-[500px] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg">Nome do Produto</label>
          <input
            value={product.name}
            onChange={updateState}
            type="text"
            placeholder="Nome"
            name="name"
            required
            className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
          />
        </div>

        {/* Seleção de imagem */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-lg">Selecione uma Imagem do Produto</label>

          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                type="button"
                key={index}
                className={`border-2 p-3 rounded-[28px] transition-all ${selectedImage === image ? 'border-[#FFDE59]' : 'border-[#220660]'}`}
                onClick={() => handleImageSelect(image)}
              >
                <img src={image} alt={`Produto ${index + 1}`} className="w-16 h-16 object-cover" />
              </button>
            ))}
          </div>

          {selectedImage && (
            <div className="mt-4">
              <p className="text-lg">Imagem Selecionada:</p>
              <img src={selectedImage} alt="Imagem selecionada" className="w-32 h-32 object-cover border-2 border-[#220660] rounded-lg" />
            </div>
          )}
        </div>

        {/* Outros campos do formulário */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg">Descrição do Produto</label>
          <input
            value={product.description}
            onChange={updateState}
            type="text"
            placeholder="Descrição"
            name="description"
            required
            className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-lg">Quantidade Em Estoque</label>
          <input
            value={product.quantity}
            onChange={updateState}
            type="number"
            placeholder="Quantidade"
            name="quantity"
            min="0"
            required
            className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-lg">Preço do Produto</label>
          <input
            value={product.price}
            onChange={updateState}
            type="number"
            placeholder="Preço"
            name="price"
            min="0"
            step="0.01"
            required
            className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
          />
        </div>

        {/* Seleção de Categoria */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-lg">Categoria do Produto</label>
          <select
            name="category"
            value={category.id}
            onChange={(e) => setCategory(categories.find(cat => cat.id === +e.target.value) || category)}
            required
            className="border-2 border-[#220660] rounded-[28px] p-3 transition-all"
          >
            <option value="">Selecione uma Categoria</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-[#220660] text-white rounded-[28px] p-3 transition-transform duration-300 hover:scale-105">
          {id !== undefined ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
