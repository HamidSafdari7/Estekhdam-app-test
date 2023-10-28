import { useState, useEffect } from 'react';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const { isAuthenticated, userLogin } = useAppContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        if (!username || !password) {
            toast.error('Please provide all the values');
        } else if (!/\S+@\S+\.\S+/.test(username)) {
            toast.error('Provide a valid email');
        } else if (password.length < 6 ) {
            toast.error('Password must be more than 6 digits');
        } else if(! /[A-Z]/.test(password) && /[a-z]/.test(password)) {
            toast.error('Password must contain both uppercase and lowercase letters');
        }
        else {
            userLogin(username, password);
        }

    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={handleLogin}>
                <Logo />
                <h3>Login</h3>

                <div className='form-row'>
                    <label className='form-label'>
                        Email
                    </label>
                    <input className='form-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='form-row'>
                    <label className='form-label'>
                        Password
                    </label>
                    <input className='form-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type='submit' className='btn btn-block'>
                    submit
                </button>
            </form>
            <ToastContainer />
        </Wrapper>
    );
};
export default Login;
