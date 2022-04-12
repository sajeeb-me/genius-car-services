import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ServiceDetails = () => {
    const { serviceId } = useParams()
    return (
        <div className='mt-5'>
            <h1 className='text-primary text-center'>Service no: {serviceId}</h1>
            <div className='text-center my-5'>
                <Link to='/checkout'>
                    <button className='btn btn-outline-primary'>Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetails;