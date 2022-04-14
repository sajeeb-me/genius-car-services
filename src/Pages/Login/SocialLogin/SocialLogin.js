import React from 'react';
import GoogleIcon from '../../../images/icons/google.png'
import FacebookIcon from '../../../images/icons/facebook.png'
import GithubIcon from '../../../images/icons/github.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';


const SocialLogin = () => {
    const navigate = useNavigate()
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);
    let errorElement;
    if (error || gitError) {
        errorElement = <p className='text-danger'>Error: {error?.message} {gitError?.message}</p>
    }
    if (user || gitUser) {
        navigate('/home')
    }
    if (loading || gitLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
                <p className='mt-2 pt-1 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
            </div>
            {errorElement}
            <div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-info d-block mx-auto my-2 w-50'>
                    <img style={{ width: '25px' }} src={GoogleIcon} alt="" />
                    <span className='px-2'>Google Sign in</span>
                </button>
                <button className='btn btn-info d-block mx-auto my-2 w-50'>
                    <img style={{ width: '25px' }} src={FacebookIcon} alt="" />
                    <span className='px-2'>Facebook Sign in</span>
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-info d-block mx-auto my-2 w-50'>
                    <img style={{ width: '25px' }} src={GithubIcon} alt="" />
                    <span className='px-2'>Github Sign in</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;