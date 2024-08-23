interface ServiceCardProps {
    image: string;
    title: string;
    text: string;
  }
  
  export function ServiceCard({ image, title, text }: ServiceCardProps) {
    return (
      <div className="bg-[#220660] size-80 flex flex-col items-center gap-2 justify-between py-8 rounded-3xl">
        <img
          className="bg-cover"
          src={image}
          alt="imagem ilustrativa do serviço"
        />
        <h2 className="text-2xl text-[#ffde59]">{title}</h2>
        <p className="text-lg text-white text-center px-8">{text}</p>
      </div>
    );
  }