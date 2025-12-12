import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TodoPage from '../components/Todopage';

const Todos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <Layout title="My Todos">
      <TodoPage />
    </Layout>
  );
};

export default Todos;
