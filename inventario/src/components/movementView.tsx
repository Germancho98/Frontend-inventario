// src/components/MovementView.tsx
import React, { useState, useEffect } from 'react';
import { getMovements, createMovement } from '../service/movementService';
import { getProducts } from '../service/productService';
import { toast } from 'react-toastify';
import '../styles/movementView.css';

const MovementView: React.FC = () => {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product: '', quantity: 0, movementType: 'entry', user: '' });

  useEffect(() => {
    fetchMovements();
    fetchProducts();
    const username = localStorage.getItem('username');
    if (username) {
      setForm((prevForm) => ({ ...prevForm, user: username }));
    }
  }, []);

  const fetchMovements = async () => {
    try {
      const data = await getMovements();
      setMovements(data);
    } catch (error) {
      toast.error('Error fetching movements');
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovement(form);
      toast.success('Movement created successfully');
      setForm({ product: '', quantity: 0, movementType: 'entry', user: form.user });
      fetchMovements();
    } catch (error) {
      toast.error('Error creating movement');
    }
  };

  return (
    <div className="movement-view">
      <form onSubmit={handleSubmit} className="movement-form">
        <label>
          Producto:
          <select name="product" value={form.product} onChange={handleInputChange} required>
            <option value="">Selecciona un producto</option>
            {products.map((product: any) => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </label>
        <label>
          Cantidad:
          <input type="number" name="quantity" value={form.quantity} onChange={handleInputChange} required />
        </label>
        <label>
          Tipo de Movimiento:
          <select name="movementType" value={form.movementType} onChange={handleInputChange} required>
            <option value="entry">Entrada</option>
            <option value="exit">Salida</option>
            <option value="modification">Modificación</option>
          </select>
        </label>
        <input type="hidden" name="user" value={form.user} />
        <button type="submit">Guardar Movimiento</button>
      </form>
      <table className="movement-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Tipo de Movimiento</th>
            <th>Usuario</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement: any) => (
            <tr key={movement._id}>
              <td>{movement.product.name}</td>
              <td>{movement.quantity}</td>
              <td>{movement.movementType === 'entry' ? 'Entrada' : movement.movementType === 'exit' ? 'Salida' : 'Modificación'}</td>
              <td>{movement.user}</td>
              <td>{new Date(movement.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementView;