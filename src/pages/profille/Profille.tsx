import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { toastAlert } from "../../util/toastAlert"

function Profille() {
    let navigate = useNavigate()
  
      const { user } = useContext(AuthContext)
  
      useEffect(() => {
          if (user.token === "") {
              toastAlert('Você precisa estar logado','info')
              navigate("/login")
          }
      }, [user.token])
      
    return (
      <div className='container mx-auto mt-4 rounded-2xl overflow-hidden'>        
        <div className="relative mt-[-6rem] h-72 flex flex-col bg-sky-500 text-white text-2xl items-center justify-center">
          <p>Nome: {user.name} </p>
          <p>Email: {user.user}</p>
        </div>
      </div>
    )
  }
  
  export default Profille