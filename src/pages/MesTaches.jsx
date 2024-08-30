import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './../assets/Css/pagesCss/MesTaches.css';

const MesTaches = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Récemment attribué', tasks: ['Tâche 1', 'Tâche 2'], isOpen: false },
    { id: 2, name: 'À faire aujourd\'hui', tasks: ['Tâche 3'], isOpen: false },
    { id: 3, name: 'À faire demain', tasks: ['Tâche 4', 'Tâche 5'], isOpen: false }
  ]);
  const [selectedView, setSelectedView] = useState('liste');
  const [selectedDates, setSelectedDates] = useState([]);
  const [tasksByDate, setTasksByDate] = useState({});

  const addSection = () => {
    const sectionName = prompt('Entrez le nom de la nouvelle section:');
    if (sectionName) {
      setSections([...sections, { id: sections.length + 1, name: sectionName, tasks: [], isOpen: false }]);
    }
  };

  const addTask = (sectionId) => {
    const taskName = prompt('Entrez le nom de la nouvelle tâche:');
    if (taskName) {
      setSections(sections.map(section => 
        section.id === sectionId ? { ...section, tasks: [...section.tasks, taskName] } : section
      ));
    }
  };

  const renameTask = (sectionId, taskIndex) => {
    const taskName = prompt('Renommez la tâche:');
    if (taskName) {
      setSections(sections.map(section => 
        section.id === sectionId ? {
          ...section, 
          tasks: section.tasks.map((task, index) => index === taskIndex ? taskName : task)
        } : section
      ));
    }
  };

  const deleteTask = (sectionId, taskIndex) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section, 
        tasks: section.tasks.filter((_, index) => index !== taskIndex)
      } : section
    ));
  };

  const toggleSection = (sectionId) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const handleDateChange = (date) => {
    setSelectedDates(date);
  };

  const handleDateClick = (date) => {
    setSelectedDates([date]);
  };

  const addTaskToDate = () => {
    const taskName = prompt('Entrez le nom de la nouvelle tâche pour cette date:');
    if (taskName && selectedDates.length > 0) {
      const dateKey = selectedDates[0].toDateString();  // Prendre la première date sélectionnée
      setTasksByDate(prevTasks => ({
        ...prevTasks,
        [dateKey]: [...(prevTasks[dateKey] || []), taskName]
      }));
    } else {
      alert('Veuillez sélectionner une date pour ajouter une tâche.');
    }
  };

  return (
    <div className="mes-taches-container">
      <h1 className="mes-taches-title">Mes Tâches</h1>
      <div className="view-selector">
        <button className={selectedView === 'liste' ? 'active' : ''} onClick={() => setSelectedView('liste')}>Liste</button>
        <button className={selectedView === 'tableau' ? 'active' : ''} onClick={() => setSelectedView('tableau')}>Tableau</button>
        <button className={selectedView === 'calendrier' ? 'active' : ''} onClick={() => setSelectedView('calendrier')}>Calendrier</button>
      </div>

      {selectedView === 'liste' && (
        <div className="task-list-view">
          {sections.map(section => (
            <div key={section.id} className="task-section">
              <div className="section-header" onClick={() => toggleSection(section.id)}>
                <h2>{section.name}</h2>
                <FontAwesomeIcon icon={section.isOpen ? faChevronUp : faChevronDown} />
              </div>
              {section.isOpen && (
                <ul>
                  {section.tasks.map((task, index) => (
                    <li key={index} className="task-item">
                      {task}
                      <div className="task-actions">
                        <FontAwesomeIcon icon={faEdit} onClick={() => renameTask(section.id, index)} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(section.id, index)} />
                      </div>
                    </li>
                  ))}
                  <li className="add-task-item" onClick={() => addTask(section.id)}>
                    <FontAwesomeIcon icon={faPlus} /> Ajouter une tâche
                  </li>
                </ul>
              )}
            </div>
          ))}
          <div className="add-section" onClick={addSection}>
            <FontAwesomeIcon icon={faPlus} /> Ajouter une section
          </div>
        </div>
      )}

      {selectedView === 'tableau' && (
        <div className="task-tableau-view">
          {sections.map(section => (
            <div key={section.id} className="task-section-tableau">
              <div className="section-header-tableau">
                <h2>{section.name}</h2>
              </div>
              <div className="task-cards">
                {section.tasks.map((task, index) => (
                  <div key={index} className="task-card">
                    <div className="task-card-content">
                      {task}
                    </div>
                    <div className="task-actions">
                      <FontAwesomeIcon icon={faEdit} onClick={() => renameTask(section.id, index)} />
                      <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(section.id, index)} />
                    </div>
                  </div>
                ))}
                <div className="add-task-item" onClick={() => addTask(section.id)}>
                  <FontAwesomeIcon icon={faPlus} /> Ajouter une tâche
                </div>
              </div>
            </div>
          ))}
          <div className="add-section" onClick={addSection}>
            <FontAwesomeIcon icon={faPlus} /> Ajouter une section
          </div>
        </div>
      )}

      {selectedView === 'calendrier' && (
        <div className="task-calendrier-view">
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            onClickDay={handleDateClick}
            selectRange
          />
          <button className="add-task-button" onClick={addTaskToDate}>
            <FontAwesomeIcon icon={faPlus} /> Ajouter des tâches aux dates sélectionnées
          </button>
          <div className="tasks-for-dates">
            {selectedDates.length > 0 && (
              <div className="tasks-for-date">
                {selectedDates.map(date => {
                  const dateKey = date.toDateString();
                  return (
                    <div key={dateKey} className="tasks-for-date-section">
                      <h2>Tâches pour {dateKey}</h2>
                      <ul>
                        {(tasksByDate[dateKey] || []).map((task, index) => (
                          <li key={index} className="task-item">
                            {task}
                            <div className="task-actions">
                              <FontAwesomeIcon icon={faEdit} onClick={() => {
                                const newTaskName = prompt('Renommez la tâche:', task);
                                if (newTaskName) {
                                  setTasksByDate(prevTasks => ({
                                    ...prevTasks,
                                    [dateKey]: prevTasks[dateKey].map((t, i) => i === index ? newTaskName : t)
                                  }));
                                }
                              }} />
                              <FontAwesomeIcon icon={faTrash} onClick={() => {
                                if (window.confirm('Voulez-vous vraiment supprimer cette tâche?')) {
                                  setTasksByDate(prevTasks => ({
                                    ...prevTasks,
                                    [dateKey]: prevTasks[dateKey].filter((_, i) => i !== index)
                                  }));
                                }
                              }} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MesTaches;
