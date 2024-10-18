import { useState } from 'react';
import '../styles/login.css';
import { registerUser } from '../service/authService';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await registerUser(username, password);
            console.log(`User registered successfully. Token: ${data.token}`);
            toast.success('Usuario registrado correctamente!', {
                onClose: () => navigate('/login')
            });
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error('Error registering user');
        }
    };

    const onRegisterClick = (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError("");
        setPasswordError("");
        setConfirmPasswordError("");

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

        if (confirmPassword === "") {
            setConfirmPasswordError("Confirme la contraseña");
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden");
            return;
        }

        // Llamar a handleRegister si todas las validaciones son correctas
        handleRegister(e);
    };

    return (
        <div className="login-box">
            <h2>Registrarse</h2>
            <form onSubmit={onRegisterClick}>
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
                <div className="user-box">
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder='Confirme la contraseña'
                        onChange={ev => setConfirmPassword(ev.target.value)}
                        className={'user-box'}
                    />
                    <label className='errorLabel'>{confirmPasswordError}</label>
                </div>
                <input
                    className={"inputButton"}
                    type="submit"
                    value={"Registrarse"}
                />
                <Link to="/login" className="register-link">Iniciar sesión</Link>
            </form>
            <ToastContainer />
        </div>
    );
}

export default RegisterForm;