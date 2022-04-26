import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import axios from 'axios';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const emailRef = useRef('')
    const passwordRef = useRef('')

    let errorElement;

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [token] = useToken(user)


    if (token) {
        navigate(from, { replace: true })
    }

    if (loading) {
        return <Loading></Loading>
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password)
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success('Sent email');
        }
        else {
            toast.warning('Email not provided.')
        }
    }

    return (
        <div className='w-50 mx-auto'>
            <PageTitle title="Login" />
            <h2 className='text-primary mt-3 text-center'>Login here</h2>
            <div>
                <Form onSubmit={handleSubmit} className='py-2'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                    </Form.Group>
                    {errorElement}
                    <Button className='w-50 d-block mx-auto' variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <button onClick={resetPassword} className='btn btn-link text-decoration-none p-0'>Forget password?</button>
                <p>New to Genius Car? <Link to='/register' className='text-decoration-none'>Register</Link></p>
            </div>
            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Login;