// src/components/ReportsView.tsx
import React, { useState, useEffect } from 'react';
import { getInventoryReport, getMovementReport } from '../service/reportService';
import { toast } from 'react-toastify';
import '../styles/reportsView.css';

const ReportsView: React.FC = () => {
  const [inventoryReport, setInventoryReport] = useState([]);
  const [movementReport, setMovementReport] = useState([]);

  useEffect(() => {
    fetchInventoryReport();
    fetchMovementReport();
  }, []);

  const fetchInventoryReport = async () => {
    try {
      const data = await getInventoryReport();
      setInventoryReport(data);
    } catch (error) {
      toast.error('Error fetching inventory report');
    }
  };

  const fetchMovementReport = async () => {
    try {
      const data = await getMovementReport();
      setMovementReport(data);
    } catch (error) {
      toast.error('Error fetching movement report');
    }
  };

  return (
    <div className="reports-view">
      <h2>Informe de inventario</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Nombre producto</th>
            <th>Cantidad</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {inventoryReport.map((product: any) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Informe de movimiento</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Nombre producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movementReport.map((movement: any) => (
            <tr key={movement._id}>
              <td>{movement.product.name}</td>
              <td>{movement.movementType === 'entry' ? 'Entrada' : movement.movementType === 'exit' ? 'Salida' : 'Modificación'}</td>
              <td>{movement.quantity}</td>
              <td>{new Date(movement.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsView;