import React, { useState, useEffect, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { useAppContext } from "../contexts/AppContext";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components once
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



  
const VisualFinance = ({ height='40rem'}) => {
  
  const {expense, totalE, totalIncome, newEx, newIn } = useAppContext();
 
  // console.log(height)
// random color generator

  function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color= '#';
    for(let i = 0; i < 6; i++){
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

const [colorMap, setColorMap] = useState({});

useEffect(() => {
  setColorMap(prev => {
    const newMap = { ...prev };
    expense.forEach(item => {
      if (!newMap[item.title]) {
        newMap[item.title] = getRandomColor();
      }
    });
    newMap["Remaining Balance"] = "#858189"; 
    return newMap;
  });
}, [newEx, newIn, expense]);

// labels and values for each:

const labels = expense.map(item => item.title);
const values = expense.map(item => item.value);


// const labels = expense.map(item => item.title).concat("Remaining Balance");
// const values = expense.map(item => item.value).concat(totalIncome - totalE);

const backgroundColors = labels.map(label => colorMap[label]);

const data =  useMemo(() => ({
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
      },
    ],
  }), [labels, values, backgroundColors]);

   const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw; // value of data
            const percent = ((value / totalE) * 100).toFixed(1);
            return `${label}: ₹${value} (${percent}%)`;
          },
        },
      },
      legend: {
        position: "right",
        align: "center",
        labels: {
          boxWidth: 20,
          padding: 10,
          maxWidth: 120,
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label} (₹${value})`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
        padding: 10,
      },
      layout: {
        padding: {
          right: -80,
        },
      },
      title: {
        display: false,
        text: "visuals of budget",
      },
    },
  }), [totalE]);


// bar chart

// const barData = useMemo(() => {
//   return {
//     labels: expense.map(item => item.title), // categories = expense titles
//     datasets: [
//       {
//         label: "Expense",
//         data: expense.map(item => item.value), // numeric values
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//       },
//       {
//         label: "Total Income",
//         data: expense.map(() => totalIncome), // repeat totalIncome across categories
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//     ],
//   };
// }, [totalIncome, expense]);
 


  // const barOptions = useMemo(() => {
  //   return {
  //     responsive: true,
  //     plugins: {
  //       legend: { position: "top" },
  //       title: { display: true, text: "Income vs Expense" },
  //     },
  //   };
  // }, []);


  return (
    <>   
    <div className="visuals flex flex-col justify-center items-center w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 sm:p-6">
      <h2 className='text-xl sm:text-2xl font-semibold text-center text-[var(--text-primary)] mb-4'>Budget Split</h2>
      <div className="piechart w-full max-w-sm sm:max-w-md lg:max-w-lg" style={{ height: height }}>
        <Pie data={data} options={options} />
      </div>
    </div>
    </>
  )
}

export default VisualFinance