import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";

interface PublicProps {
  component: React.ComponentType;
}

export const Public = ({ component: RouteComponent }: PublicProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);

    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return <>{!isAuthenticated && <RouteComponent />}</>;
};

export default Public;
