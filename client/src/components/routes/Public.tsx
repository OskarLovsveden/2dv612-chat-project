import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

interface PublicProps {
  component: React.ComponentType;
}

export const Private = ({ component: RouteComponent }: PublicProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {!isAuthenticated && <RouteComponent />}
      {isAuthenticated && navigate("/home")}
    </>
  );
};

export default Private;
