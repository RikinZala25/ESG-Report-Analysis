import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AllocationLineChart = ({ symbol, lower_bound, upper_bound, date_list }) => {
//   console.log(symbol, lower_bound, upper_bound, date_list);

  const data = {
    labels: date_list,
    datasets: [
      {
        id: 1,
        label: "Lower Bound",
        data: lower_bound,
        borderColor: 'rgb(220, 20, 60)',
        borderWidth: 2,
      },
      {
        id: 2,
        label: "Upper Bound",
        data: upper_bound,
        borderColor: 'rgb(0, 191, 255)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default AllocationLineChart;