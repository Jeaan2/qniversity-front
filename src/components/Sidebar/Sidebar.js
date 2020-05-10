import React from 'react';
import './Sidebar.css'
import {slide as Menu } from 'react-burger-menu';

export default props => {
    return (
      <Menu>
        <a className="menu-item" href="/main">
          Cursos
        </a>
  
        <a className="menu-item" href="/classes">
          Turmas
        </a>
  
        <a className="menu-item" href="/questionbank">
          Banco de questões
        </a>
  
      </Menu>
    );
  };