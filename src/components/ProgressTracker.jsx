import React, { useState, useEffect } from 'react';
import './../assets/Css/componentsCss/ProgressTracker.css';
import { ProgressBar } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 60 },
  { name: 'In Progress', value: 30 },
  { name: 'Not Started', value: 10 },
];

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const ProgressTracker = ({ tasks }) => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Simuler des données de progression ou récupérer depuis une API
    const fetchData = () => {
      const completed = tasks.filter(task => task.status === 'completed').length;
      const inProgress = tasks.filter(task => task.status === 'in-progress').length;
      const notStarted = tasks.filter(task => task.status === 'not-started').length;
      setProgressData([
        { name: 'Completed', value: completed },
        { name: 'In Progress', value: inProgress },
        { name: 'Not Started', value: notStarted },
      ]);
    };

    fetchData();
  }, [tasks]);

  return (
    <div className="progress-tracker">
      <h2>Suivi des Progrès</h2>
      <div className="progress-summary">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={progressData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {progressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="progress-details">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <h3>{task.title}</h3>
            <ProgressBar now={task.progress} label={`${task.progress}%`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
