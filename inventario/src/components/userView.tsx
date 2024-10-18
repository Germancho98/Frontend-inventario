import React, { useState } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import ProductView from './productView';
import CategoryView from './categoryView';
import MovementView from './movementView';
import AdminUserView from './adminUserView ';
import ReportsView from './reportsView';
import '../styles/userView.css';

const UserView: React.FC = () => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<string>('products'); // Estado para manejar la vista activa

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    const renderActiveView = () => {
        switch (activeView) {
            case 'products':
                return <ProductView />;
            case 'categories':
                return <CategoryView />;
            case 'movements':
                return <MovementView />;
            case 'adminUsers':
                return role === 'admin' ? <AdminUserView /> : <h2>No tienes permiso para ver esta página</h2>;
            case 'reports':
                return <ReportsView />;
            default:
                return <h2>Esta es tu página de usuario</h2>;
        }
    };

    return (
        <div className="user-view">
            <div className="sidebar">
                <Sidebar setActiveView={setActiveView} />
            </div>
            <div className="main-content">
                <div className="header">
                    <div className="user-info">
                        <FaUserCircle size={24} />
                        <span>{username}</span>
                        <FaCaretDown />
                        <div className="dropdown-menu">
                            <a href="/profile">Perfil</a>
                            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
                        </div>
                    </div>
                </div>
                {renderActiveView()}
            </div>
        </div>
    );
};

export default UserView;