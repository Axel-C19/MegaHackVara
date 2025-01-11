import React from 'react';
import './sidebar.scss';
import { 
  MdDashboard,
  MdAccessTime,
  MdList,
  MdGroup,
  MdPersonAdd,
  MdAdd
} from 'react-icons/md';
import { 
  FaFacebook, 
  FaTwitter, 
  FaUserCircle 
} from 'react-icons/fa';

export function Sidebar(){
  const groups = [
    "Varathon cdmx"
  ];

  return (
    <div className="sidebar">
      {/* Secciones Principales */}
      <div className="sidebar-sections">
        <div className="sidebar-item">
          <MdDashboard className="icon" />
          <span>Panel de control</span>
        </div>
        
        <div className="sidebar-item">
          <MdAccessTime className="icon" />
          <span>Actividad reciente</span>
        </div>
        
        <div className="sidebar-item">
          <MdList className="icon" />
          <span>Todos los gastos</span>
        </div>
      </div>

      {/* Sección de Grupos */}
      <div className="section-title">
        <h3>GRUPOS</h3>
        <button className="add-button">
          <MdAdd className="icon" />
          <span>añadir</span>
        </button>
      </div>

      <div className="groups-list">
        {groups.map((group, index) => (
          <div key={index} className="sidebar-item group-item">
            <MdGroup className="icon" />
            <span>{group}</span>
          </div>
        ))}
      </div>

      {/* Sección de Invitación */}
      <div className="invite-section">
        <button className="share-button facebook">
          <FaFacebook className="icon" />
          Compartir
        </button>
        <button className="share-button twitter">
          <FaTwitter className="icon" />
          Tuitear
        </button>
      </div>
    </div>
  );
};