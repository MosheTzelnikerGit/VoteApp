import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Chart } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Statistics.css';
import axios from 'axios';

// רשום את קומפוננטות Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CandidateStats {
  name: string;
  votes: number;
  image: string;
}

const StatisticsPage: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [stats, setStats] = useState<CandidateStats[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/candidates",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
        
        const usernames = response.data.map((candidate: CandidateStats) => candidate.name);
        const votes = response.data.map((candidate: CandidateStats) => candidate.votes);
        
        setChartData({
          labels: usernames,
          datasets: [
            {
              label: 'Number of Votes',
              data: votes,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="statistics-page">
      <h1>Candidate Statistics</h1>
      
      {chartData && (
        <div className="chart-container">
          <Chart type="bar" data={chartData} options={{ responsive: true }} />
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Votes</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.votes}</td>
              <td><img src={candidate.image} alt={candidate.name} className="candidate-image" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsPage;
