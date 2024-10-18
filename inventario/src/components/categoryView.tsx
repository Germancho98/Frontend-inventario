import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../service/categoryService';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/categoryView.css';
import 'react-toastify/dist/ReactToastify.css';

const CategoryView: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '' });
  interface Category {
    _id: string;
    name: string;
  }

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Error fetching categories');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, form);
        toast.success('Category updated successfully');
      } else {
        await createCategory(form);
        toast.success('Category created successfully');
      }
      setForm({ name: '' });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error('Error saving category');
    }
  };

  const handleEdit = (category: any) => {
    setForm(category);
    setEditingCategory(category);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Error deleting category');
    }
  };

  return (
    <div className="category-view">
      <form onSubmit={handleSubmit} className="category-form">
        <label>
          Nombre de la categoría:
          <input type="text" name="name" value={form.name} onChange={handleInputChange} required />
        </label>
        <button type="submit">{editingCategory ? 'Actualizar categoría' : 'Guardar categoría'}</button>
      </form>
      <table className="category-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleEdit(category)}><FaEdit /></button>
                <button onClick={() => handleDelete(category._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default CategoryView;