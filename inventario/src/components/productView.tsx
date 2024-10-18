import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../service/productService';
import { getCategories } from '../service/categoryService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import StockAlertModal from './stockAlertModal';
import '../styles/productView.css';

const STOCK_THRESHOLD = 50;

const ProductView: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', quantity: 0, price: 0, category: '', stockAlert: false });
  const [errors, setErrors] = useState({ name: '', description: '', quantity: '', price: '', category: '' });
  const [editingProduct, setEditingProduct] = useState<{ _id: string } | null>(null);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      checkStockAlerts(data);
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Error fetching categories');
    }
  };

  const checkStockAlerts = (products: any[]) => {
    const lowStock = products.filter(product => product.quantity < STOCK_THRESHOLD && product.stockAlert);
    setLowStockProducts(lowStock);
    if (lowStock.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = { name: '', description: '', quantity: '', price: '', category: '' };
    let isValid = true;

    if (!form.name) {
      newErrors.name = 'El nombre es obligatorio';
      isValid = false;
    }
    if (!form.description) {
      newErrors.description = 'La descripción es obligatoria';
      isValid = false;
    }
    if (form.quantity <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor que 0';
      isValid = false;
    }
    if (form.price <= 0) {
      newErrors.price = 'El precio debe ser mayor que 0';
      isValid = false;
    }
    if (!form.category) {
      newErrors.category = 'La categoría es obligatoria';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, form);
        toast.success('Producto actualizado satisfactoriamente');
      } else {
        await createProduct(form);
        toast.success('Productos creado satisfactoriamente');
      }
      setForm({ name: '', description: '', quantity: 0, price: 0, category: '', stockAlert: false });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error('Error al guardar el producto');
    }
  };

  const handleEdit = (product: any) => {
    setForm({ name: product.name, description: product.description, quantity: product.quantity, price: product.price, category: product.category._id, stockAlert: product.stockAlert });
    setEditingProduct(product);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Seguro que deseas eliminar el producto?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      toast.success('Producto eliminado satisfactoriamente');
      fetchProducts();
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  return (
    <div className="product-view">
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Nombre:
          <input type="text" name="name" value={form.name} onChange={handleInputChange} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Descripción:
          <input type="text" name="description" value={form.description} onChange={handleInputChange} required />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Cantidad:
          <input type="number" name="quantity" value={form.quantity} onChange={handleInputChange} required />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </label>
        <label>
          Precio:
          <input type="number" name="price" value={form.price} onChange={handleInputChange} required />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>
        <label>
          Categoría:
          <select name="category" value={form.category} onChange={handleInputChange} required>
            <option value="">Selecciona una categoría</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </label>
        <label className="stock-alert-label">
          Stock Alert:
          <input type="checkbox" name="stockAlert" checked={form.stockAlert} onChange={handleInputChange} />
          <span>(Notificar cuando el stock sea bajo)</span>
        </label>
        <button type="submit">{editingProduct ? 'Actualizar producto' : 'Guardar producto'}</button>
      </form>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock Alert</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td>{product.stockAlert ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(product)}><FaEdit /></button>
                <button onClick={() => handleDelete(product._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <StockAlertModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        lowStockProducts={lowStockProducts}
      />
      <ToastContainer />
    </div>
  );
};

export default ProductView;