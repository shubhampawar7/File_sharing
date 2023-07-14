import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Protected = (props) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let login = localStorage.getItem("email");
    
    if (login) {
      setIsAuthorized(true);
    } else {
      navigate('/');
    }
  }, []);

  return (
    <>
      {isAuthorized && <Dashboard />}
    </>
  );
}

export default Protected;
