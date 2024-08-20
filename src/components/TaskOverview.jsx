// src/components/TaskOverview.jsx
import React from 'react';
import './../assets/Css/componentsCss/TaskOverview.css';

const TaskOverview = ({ tasks }) => {
  return (
    <div className="task-overview">
      <h2>Vue d’Ensemble des Tâches</h2>
      <div className="task-list">
        {tasks.map(task => (
          <div className="task-item" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Status: {task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskOverview;
