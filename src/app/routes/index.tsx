import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom"
import { Login } from "../pages/login/Login"
import { CadastroPet } from "../pages/cadastro/Cadastro"
import { CadastroUsuario } from "../pages/cadastro/CadastroUsuario"
import { UserPager } from "../pages/user_page/UserPage"

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path ="/" element={<Login />}/>
                <Route path ="/gerenciamento" element={<UserPager />}/>
                <Route path ="/cadastroUsuario" element={<CadastroUsuario />}/>
                <Route path ="/cadastroPet" element={<CadastroPet />}/>
            </Switch>
        </BrowserRouter>
    )
} 