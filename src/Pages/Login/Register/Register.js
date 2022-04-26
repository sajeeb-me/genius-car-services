import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css'
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import Loading from '../Loading/Loading';
import useToken from '../../../hooks/useToken';

const Register = () => {
    const [agree, setAgree] = useState(false)
    const navigate = useNavigate()

    let errorElement;

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, userError] = useUpdateProfile(auth);
    const [token] = useToken(user)

    if (loading || updating) {
        return <Loading></Loading>
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });

    }

    if (token) {
        navigate('/');
    }

    return (
        <div className='register-form'>
            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Register here</h2>
            <div>
                <form onSubmit={handleRegister}>
                    <input type="text" name="name" id="name" placeholder='Full Name' required />
                    <input type="email" name="email" id="email" placeholder='Email' required />
                    <input type="password" name="password" id="password" placeholder='Password' required />
                    <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                    <label className={`ps-2 ${agree ? 'opacity-100' : 'opacity-50 text-danger'} `} htmlFor="terms">Accept Genius Car's Terms and Conditions.</label>
                    {errorElement}
                    <input disabled={!agree} className='w-50 mx-auto btn btn-primary my-2' type="submit" value="Register" />
                </form>
                <p>Already have account? <Link to='/login' className='text-decoration-none'>Login</Link></p>
            </div>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;