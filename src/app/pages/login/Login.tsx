import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import TextFieldCustom from "@/app/components/BasicTextField";

export const Login: React.FC = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
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
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Usuário"
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Senha *
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
