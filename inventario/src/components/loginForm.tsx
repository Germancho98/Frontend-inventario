import { useState } from 'react';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../service/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const onButtonClick = async () => {
        setUsernameError("");
        setPasswordError("");

        if (username === "") {
            setUsernameError("Ingrese nombre de usuario");
            return;
        }

        if (password === "") {
            setPasswordError("Ingrese la contraseña");
            return;
        }

        if (password.length < 8) {
            setPasswordError("La contraseña debe tener 8 caracteres o más");
            return;
        }

        try {
            const data = await loginUser(username, password);
            toast.success('Inicio de sesión exitoso!');
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            navigate('/user');
        } catch (error) {
            toast.error('Error al iniciar sesión. Por favor, verifique sus credenciales.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onButtonClick();
    };

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input
                        type="text"
                        value={username}
                        placeholder='Introduzca su nombre de usuario'
                        onChange={ev => setUsername(ev.target.value)}
                        className={"user-box"}
                    />
                    <label className='errorLabel'>{usernameError}</label>
                </div>
                <div className="user-box">
                    <input
                        type="password"
                        value={password}
                        placeholder='Introduzca la contraseña'
                        onChange={ev => setPassword(ev.target.value)}
                        className={'user-box'}
                    />
                    <label className='errorLabel'>{passwordError}</label>
                </div>
                <button
                    className={"inputButton"}
                    type="submit"
                >
                    Ingresar
                </button>
                <Link to="/register" className="register-link">Registrarme</Link>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;