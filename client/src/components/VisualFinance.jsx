import React from 'react'
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

import { Pie } from 'react-chartjs-2';
import { useAppContext } from '../contexts/AppContext';




const VisualFinance = ({width='50vw'}) => {
  
  const {expense, totalE } = useAppContext()
  let data = {labels: [], datasets: [{data: [], backgroundColor:['#FF6384', '#36A2EB', '#FFCE56']}]}
  var totalExpense = 0
  {
    expense.forEach((item) => {
        data.labels.push(item.title)
        data.datasets[0].data.push(item.value);
        totalExpense += item.value
        
    })
  }
  data.datasets[0].data.push(800-totalExpense)
  
  const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || '';
          const value = context.raw; // actual ₹ value
          const total = totalE; // your total income
          const percent = ((value / total) * 100).toFixed(1);

          return `${label}: ₹${value} (${percent}%)`;
        }
      }
    },
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Expenses Breakdown',
    }
  }
};




  return (
    <>   
    <div>VisualFinance</div>
    {/* <Doughnut data={...} /> */}
    <div className={`piechart w-[${width}] h-[50vh] `}>

    <Pie data={data} options={options}  />;
    

    </div>
    </>
  )
}

export default VisualFinance