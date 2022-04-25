import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useServiceDetails from '../../../hooks/useServiceDetail';

const ServiceDetails = () => {
    const { serviceId } = useParams()
    const [service] = useServiceDetails(serviceId)
    return (
        <div className='mt-5'>
            <h1 className='text-primary text-center'>You are about to book: {service.name}</h1>
            <div className='text-center my-5'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-outline-primary'>Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetails;