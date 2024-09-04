import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './../assets/Css/pagesCss/ProjectDetailPage.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Dummy project details data (replace with actual data from API or props)
const projectDetails = {
  id: '1',
  name: 'Projet Alpha',
  description: 'Ceci est une description du projet Alpha.',
  startDate: '2024-08-01',
  endDate: '2024-12-31',
  status: 'En cours',
  progress: 70
};

const tasks = [
  { id: '1', name: 'Task Alpha', progress: 60, deadline: '2024-08-25', responsible: 'Alice Johnson' },
  { id: '2', name: 'Task Beta', progress: 100, deadline: '2024-08-20', responsible: 'Bob Smith' },
  { id: '3', name: 'Task Gamma', progress: 30, deadline: '2024-09-10', responsible: 'Charlie Brown' },
];

const ProjectDetailPage = () => {
  const [sections, setSections] = useState([
    { id: '1', name: 'Récemment attribué', tasks: ['Task Alpha', 'Task Beta'], isOpen: false },
    { id: '2', name: 'À faire aujourd\'hui', tasks: ['Task Gamma'], isOpen: false },
    { id: '3', name: 'À faire demain', tasks: [], isOpen: false }
  ]);
  const [selectedView, setSelectedView] = useState('liste');
  const [selectedDates, setSelectedDates] = useState([]);
  const [tasksByDate, setTasksByDate] = useState({});
  const [taskDetails, setTaskDetails] = useState(null);

  const addSection = () => {
    const sectionName = prompt('Entrez le nom de la nouvelle section:');
    if (sectionName) {
      setSections([...sections, { id: (sections.length + 1).toString(), name: sectionName, tasks: [], isOpen: false }]);
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

  const addTaskToDate = () => {
    const taskName = prompt('Entrez le nom de la nouvelle tâche pour cette date:');
    if (taskName && selectedDates.length > 0) {
      const dateKey = selectedDates[0].toDateString();
      setTasksByDate(prevTasks => ({
        ...prevTasks,
        [dateKey]: [...(prevTasks[dateKey] || []), taskName]
      }));
    } else {
      alert('Veuillez sélectionner une date pour ajouter une tâche.');
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    const sourceSectionIndex = sections.findIndex(section => section.id === source.droppableId);
    const destinationSectionIndex = sections.findIndex(section => section.id === destination.droppableId);

    const sourceSection = sections[sourceSectionIndex];
    const destinationSection = sections[destinationSectionIndex];

    const sourceTasks = Array.from(sourceSection.tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    const destinationTasks = Array.from(destinationSection.tasks);
    destinationTasks.splice(destination.index, 0, movedTask);

    const updatedSections = [...sections];
    updatedSections[sourceSectionIndex] = { ...sourceSection, tasks: sourceTasks };
    updatedSections[destinationSectionIndex] = { ...destinationSection, tasks: destinationTasks };

    setSections(updatedSections);
  };

  const openTaskDetails = (task) => {
    setTaskDetails(task);
  };

  const closeTaskDetails = () => {
    setTaskDetails(null);
  };

  return (
    <div className="mes-taches-container">
      <h1 className="mes-taches-title">Détails du Projet</h1>
      <div className="project-details">
        <h2>{projectDetails.name}</h2>
        <p><strong>Description:</strong> {projectDetails.description}</p>
        <p><strong>Date de début:</strong> {projectDetails.startDate}</p>
        <p><strong>Date de fin:</strong> {projectDetails.endDate}</p>
        <p><strong>Statut:</strong> {projectDetails.status}</p>
        <p><strong>Avancement:</strong> {projectDetails.progress}%</p>
      </div>
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
                        <FontAwesomeIcon icon={faEdit} onClick={() => openTaskDetails(task)} />
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-sections" direction="horizontal">
            {(provided) => (
              <div
                className="task-tableau-view"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sections.map((section, sectionIndex) => (
                  <Droppable key={section.id} droppableId={section.id}>
                    {(provided) => (
                      <div
                        className="task-section-tableau"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="section-header-tableau">
                        <h2>{section.name}</h2>
                        </div>
                        <div className="task-cards">
                          {section.tasks.map((task, taskIndex) => (
                            <Draggable key={task} draggableId={task} index={taskIndex}>
                              {(provided) => (
                                <div
                                  className="task-card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="task-card-content">
                                    {task}
                                    <div className="task-actions">
                                      <FontAwesomeIcon icon={faEdit} onClick={() => openTaskDetails(task)} />
                                      <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(section.id, taskIndex)} />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          <div className="add-task-item" onClick={() => addTask(section.id)}>
                            <FontAwesomeIcon icon={faPlus} /> Ajouter une tâche
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {selectedView === 'calendrier' && (
        <div className="calendar-view">
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
          />
          <div className="add-task-item" onClick={addTaskToDate}>
            <FontAwesomeIcon icon={faPlus} /> Ajouter une tâche pour la date sélectionnée
          </div>
          <div className="tasks-by-date">
            {Object.keys(tasksByDate).map(date => (
              <div key={date} className="tasks-date">
                <h3>{date}</h3>
                <ul>
                  {tasksByDate[date].map((task, index) => (
                    <li key={index} className="task-item">
                      {task}
                      <div className="task-actions">
                        <FontAwesomeIcon icon={faEdit} onClick={() => openTaskDetails(task)} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => setTasksByDate(prevTasks => ({
                          ...prevTasks,
                          [date]: prevTasks[date].filter((_, i) => i !== index)
                        }))} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {taskDetails && (
        <div className="task-details-overlay">
          <div className="task-details-container">
            <h3>Détails de la tâche</h3>
            <p><strong>Tâche:</strong> {taskDetails}</p>
            <button onClick={closeTaskDetails}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;

