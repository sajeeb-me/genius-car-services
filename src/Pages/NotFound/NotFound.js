import React from 'react';
import NotFoundImg from '../../images/404.png'

const NotFound = () => {
    return (
        <div>
            <h1 className='text-warning text-center my-3'>Page not found!</h1>
            <img className='w-100' src={NotFoundImg} alt="" />
        </div>
    );
};

export default NotFound;