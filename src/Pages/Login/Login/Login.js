import { async } from '@firebase/util';
import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

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

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password)
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        alert('Sent email');
    }

    if (user) {
        navigate(from, { replace: true })
    }

    return (
        <div className='w-50 mx-auto'>
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