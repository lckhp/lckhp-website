import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "https://forms.gle/b7gmsnXeQTGjRCAx8";
  }, [navigate]);

  return (
    <div>
      <h1>Redirecting to Registration Form...</h1>
    </div>
  );
};

export default RegisterRedirect;
