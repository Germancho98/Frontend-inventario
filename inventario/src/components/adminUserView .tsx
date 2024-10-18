import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../service/userService';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/adminUserView.css';

const AdminUserView: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [editingUser, setEditingUser] = useState<{ _id: string } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser._id, form);
        toast.success('User updated successfully');
      } else {
        await createUser(form);
        toast.success('User created successfully');
      }
      setForm({ username: '', password: '', role: 'user' });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error('Error saving user');
    }
  };

  const handleEdit = (user: any) => {
    setForm({ username: user.username, password: '', role: user.role });
    setEditingUser(user);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  return (
    <div className="admin-user-view">
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Nombre de usuario:
          <input type="text" name="username" value={form.username} onChange={handleInputChange} required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={form.password} onChange={handleInputChange} required />
        </label>
        <label>
          Rol:
          <select name="role" value={form.role} onChange={handleInputChange} required>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <button type="submit">{editingUser ? 'Actualizar usuario' : 'Guardar usuario'}</button>
      </form>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}><FaEdit /></button>
                <button onClick={() => handleDelete(user._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserView;