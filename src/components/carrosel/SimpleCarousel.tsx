import { useEffect, useState } from 'react';
import image1 from '../../assets/bela-usina-de-energia.jpg';
import image2 from '../../assets/projeto-de-paineis-solares-3d.jpg';
import image3 from '../../assets/projetoSocialEnerniaSolar.jpg';
import image4 from '../../assets/projeto-carioca-energia-solar-favelas-finalista-premio-global-onu-3-conexao-planeta.jpg';
import image5 from '../../assets/projetoSocialEnerniaSolar1.jpg';




const images = [image1,image2,image4,image3, image5];

const SimpleCarousel = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-96">
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full bg-center object-contain duration-500"
      ></div>
      
      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      
      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default SimpleCarousel;
