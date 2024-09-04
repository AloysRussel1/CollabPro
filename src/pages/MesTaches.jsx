import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './../assets/Css/pagesCss/MesTaches.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';

// Initialiser la modale
Modal.setAppElement('#root');

const MesTaches = () => {
  const [sections, setSections] = useState([
    { id: '1', name: 'Récemment attribué', tasks: ['Tâche 1', 'Tâche 2'], isOpen: false },
    { id: '2', name: 'À faire aujourd\'hui', tasks: ['Tâche 3'], isOpen: false },
    { id: '3', name: 'À faire demain', tasks: ['Tâche 4', 'Tâche 5'], isOpen: false }
  ]);
  const [selectedView, setSelectedView] = useState('liste');
  const [selectedDates, setSelectedDates] = useState([]);
  const [tasksByDate, setTasksByDate] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState('');

  // Ouvrir la modale avec les détails de la tâche
  const openModal = (taskDetails) => {
    setSelectedTaskDetails(taskDetails);
    setModalIsOpen(true);
  };

  // Fermer la modale
  const closeModal = () => {
    setModalIsOpen(false);
  };

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
                            <Draggable key={taskIndex} draggableId={`${section.id}-${taskIndex}`} index={taskIndex}>
                              {(provided) => (
                                <div
                                  className="task-card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => openModal(task)}
                                >
                                  <div className="task-card-content">
                                    {task}
                                  </div>
                                  <div className="task-actions">
                                    <FontAwesomeIcon icon={faEdit} onClick={() => renameTask(section.id, taskIndex)} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(section.id, taskIndex)} />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                        <div className="add-task-card" onClick={() => addTask(section.id)}>
                          <FontAwesomeIcon icon={faPlus} /> Ajouter une tâche
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
          <button className="add-task-calendar" onClick={addTaskToDate}>
            <FontAwesomeIcon icon={faPlus} /> Ajouter une tâche à cette date
          </button>
          <div className="tasks-by-date">
            {Object.keys(tasksByDate).map(date => (
              <div key={date} className="date-tasks">
                <h3>{date}</h3>
                <ul>
                  {tasksByDate[date].map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modale pour les détails de la tâche */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Détails de la tâche">
        <h2>Détails de la Tâche</h2>
        <p>{selectedTaskDetails}</p>
        <button onClick={closeModal}>Fermer</button>
      </Modal>
    </div>
  );
};

export default MesTaches;
