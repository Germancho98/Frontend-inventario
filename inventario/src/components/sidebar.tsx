import React from 'react';
import { FaBox, FaClipboardList, FaChartBar, FaTags, FaUsers } from 'react-icons/fa';
import '../styles/sidebar.css';

interface SidebarProps {
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveView }) => {
  const role = localStorage.getItem('role'); // Obtener el rol del localStorage

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="https://raw.githubusercontent.com/ZainRk/React-Admin-Dashboard-public/refs/heads/master/src/imgs/logo.png" alt="Logo" className="logo" />
      </div>
      <ul>
        <li>
          <button onClick={() => setActiveView('products')}>
            <FaBox /> Productos
          </button>
        </li>
        <li>
          <button onClick={() => setActiveView('categories')}>
            <FaTags /> Categorías
          </button>
        </li>
        <li>
          <button onClick={() => setActiveView('movements')}>
            <FaClipboardList /> Movimientos
          </button>
        </li>
        {role === 'admin' && (
          <li>
            <button onClick={() => setActiveView('adminUsers')}>
              <FaUsers /> Usuarios
            </button>
          </li>
        )}
        <li>
          <button onClick={() => setActiveView('reports')}>
            <FaChartBar /> Reportes
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;