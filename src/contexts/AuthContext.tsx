import { createContext, ReactNode, useState } from "react"
import { login } from "../services/Services"
import UserLogin from "../models/UserLogin"
import { toastAlert } from "../util/toastAlert"


// import { toastAlerta } from "../utils/toastAlerta"

interface AuthContextProps {
    user: UserLogin
    handleLogout(): void
    handleLogin(user: UserLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserLogin>({
        id: 0,
        name: "",
        email: "",
        password: "",
        photo: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true)
        try {
            await login(`/user/login`, userLogin, setUser)
            toastAlert("Logado com sucesso",'sucess')
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toastAlert("Dados inconcistentes",'error')
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUser({
            id: 0,
            name: "",
            email: "",
            password: "",
            photo: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}