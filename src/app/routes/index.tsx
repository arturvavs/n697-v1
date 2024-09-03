import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom"
import { Login } from "../pages/login/Login"
import { UserPage } from "../pages/user_page/UserPage"
import { CadastroPet } from "../pages/cadastro/Cadastro"
import { CadastroUsuario } from "../pages/cadastro/CadastroUsuario"

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path ="/" element={<Login />}/>
                <Route path ="/inicio" element={<UserPage />}/>
                <Route path ="/cadastroUsuario" element={<CadastroUsuario />}/>
                <Route path ="/cadastro" element={<CadastroPet />}/>
            </Switch>
        </BrowserRouter>
    )
} 