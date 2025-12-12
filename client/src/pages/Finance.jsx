import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import DisplayFinance from '../components/DisplayFinance';
import VisualFinance from '../components/VisualFinance';
import { useAppContext } from "../contexts/AppContext";

const Finance = () => {
  const { 
    expense,
    setTotalE,
    income,
    setTotalIncome
  } = useAppContext();

  const [changes, setChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }

    const totalExpense = expense.reduce((total, item) => total + item.value, 0);
    const totalIncome = income.reduce((total, item) => total + item.value, 0);

    setTotalE(totalExpense);
    setTotalIncome(totalIncome);
  }, [expense, income, navigate, setTotalE, setTotalIncome]);
const handleBack = () => {
    navigate('/dashboard', { replace: true });
  }

  return (
    <Layout title="Finance Tracker">
      {/* <div className="mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="fixed top-24 left-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:-translate-y-1 active:translate-y-0 z-50"
          >
            ← Back
          </button>
        </div> */}
      <div className="mt-6 flex flex-col gap-8">
        <h2 className="text-center font-bold text-2xl">Finance Tracker</h2>
        <DisplayFinance />
        <VisualFinance expense={expense} setChanges={setChanges} changes={changes} height="30rem" />
      </div>
    </Layout>
  );
};

export default Finance;
