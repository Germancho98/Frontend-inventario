import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import '../styles/stockAlertModal.css';

interface StockAlertModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  lowStockProducts: any[];
}

const StockAlertModal: React.FC<StockAlertModalProps> = ({ isOpen, onRequestClose, lowStockProducts }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Stock Alert"
      className="stock-alert-modal"
      overlayClassName="stock-alert-overlay"
      ariaHideApp={true}
      parentSelector={() => document.querySelector('#root') as HTMLElement}
    >
      <div className="modal-header">
        <h2 id="stock-alert-heading">Alerta de stock</h2>
        <button onClick={onRequestClose} className="close-button">
          <FaTimes />
        </button>
      </div>
      <div className="modal-content" id="stock-alert-description">
        {lowStockProducts.length > 0 ? (
          <ul>
            {lowStockProducts.map((product) => (
              <li key={product._id}>
                {product.name} - quedan {product.quantity} en stock
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos con stock bajo.</p>
        )}
      </div>
    </Modal>
  );
};

export default StockAlertModal;