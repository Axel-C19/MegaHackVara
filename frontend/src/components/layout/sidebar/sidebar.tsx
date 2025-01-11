import React from 'react';
import './sidebar.scss';
import { ROUTES } from '@/app/consts';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  MdDashboard,
  MdAccessTime,
  MdList,
  MdGroup,
  MdPersonAdd,
  MdAdd
} from 'react-icons/md';
import {  
  FaTelegram, 
  FaUserCircle 
} from 'react-icons/fa';

import { FaXTwitter } from "react-icons/fa6";



export function Sidebar(){

  const navigate = useNavigate();
  const handleTwitterShare = () => {
     window.open("https://x.com/chain_split?s=11", "_blank");
  };

  return (
    <div className="sidebar">
      {/* Secciones Principales */}
      <div className="sidebar-sections" >
        <div className="sidebar-item" onClick={() => {navigate(ROUTES.MAIN) }}>
          <MdDashboard className="icon" />
          <span>Panel de control</span>
        </div>
        
        <div className="sidebar-item" onClick={() => {navigate(ROUTES.HOME) }}>
          <MdAccessTime className="icon" />
          <span>Actividad reciente</span>
        </div>
        
        <div className="sidebar-item" onClick={() => {navigate(ROUTES.EXPENSES) }}>
          <MdList className="icon" />
          <span>Todos los gastos</span>
        </div>

        <div className="sidebar-item" onClick={() => {navigate(ROUTES.GROUPLIST) }}>
          <MdGroup className="icon" />
          <span>Grupos</span>
        </div>
      </div>

      {/* Sección de Invitación */}
      <div className="invite-section">
        <button className="share-button facebook">
          <FaTelegram className="icon" />
          Compartir
        </button>
        <button className="share-button twitter" onClick={handleTwitterShare}>
          <FaXTwitter className="icon" />
          Tuitear
        </button>
      </div>
    </div>
  );
};