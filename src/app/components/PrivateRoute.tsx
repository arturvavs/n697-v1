import { Navigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const currentUser = Parse.User.current();
  
  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!currentUser) {
    window.alert('É necessário efetuar o login primeiro.');
    return <Navigate to="/" />;
  }

  // Se o usuário estiver autenticado, renderize o componente filho
  return children;
};

export default PrivateRoute;
