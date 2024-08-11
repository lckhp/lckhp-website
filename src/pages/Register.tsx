import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "https://forms.gle/b7gmsnXeQTGjRCAx8";
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold">Redirecting to Registration Form...</h1>
    </div>
  );
};

export default Register;
