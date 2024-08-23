import { useContext } from 'react'
import { FacebookLogo, InstagramLogo, WhatsappLogo, YoutubeLogo } from '@phosphor-icons/react'
import { AuthContext } from '../../contexts/AuthContext'

import logo from '../../assets/logo.png'
function Footer() {
 
  let footerComponent 
  const { user } = useContext(AuthContext)
  if(user.token !== "") {
    footerComponent = (
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <img src={logo} alt="Luminar logo" className="h-21" /> {/* Adiciona a logo */}
          <div className='flex gap-6'>
            <InstagramLogo size={32} weight='bold' />
            <FacebookLogo size={32} weight='bold' />
            <YoutubeLogo size={32} weight='bold' />
            <WhatsappLogo size={32} weight='bold' />
          </div>
        </div>
      </div>    
  )}

    return (
        <>
        {footerComponent}
        </>
    )
}

export default Footer