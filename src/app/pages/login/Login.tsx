import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Login: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  {/*handleLogin: função simples que realiza o login na aplicação, validando através do Parse.User.logIn o usuário e senha cadastradas na tabela _User do Back4App */}
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await Parse.User.logIn(username, password);
      console.log("Usuário autenticado:", user);
      navigate("/gerenciamento");
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  {/*Bloco de instruções para funcionalidade do icone de exibir/ocultar a senha escrita no campo. Essa função já vem nativamente pronta do MUI5, apenas fiz alguns ajustes para adequard a lógica do componente Login.tsx */}
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p>{error}</p>}
        <form>
          <div className="mb-4">
            <TextField //Componente importado da MUI5
              required
              fullWidth
              id="outlined-required"
              label="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <FormControl variant="outlined" fullWidth> {/*Componente importado da MUI5 */}
              <InputLabel htmlFor="outlined-adornment-password"> {/*Componente importado da MUI5 */}
                Senha *
              </InputLabel>
              <OutlinedInput //Componente importado da MUI5 
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end"> {/*Componente importado da MUI5 */}
                    <IconButton //Componente improtado da MUI5
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />} {/*Aplicação da funcionalidade de exibição de senha, nativamente importada da MUI5*/}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={handleLogin}
          >
            Logar
          </button>
          <div className="text-center mt-4">
            <a href="/cadastroUsuario" className="text-blue-500 hover:underline">
              Cadastre-se
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
