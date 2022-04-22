import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ServiceDetails = () => {
    const { serviceId } = useParams()
    const [service, setService] = useState({})
    useEffect(() => {
        const url = `http://localhost:5000/service/${serviceId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])
    return (
        <div className='mt-5'>
            <h1 className='text-primary text-center'>You are about to book: {service.name}</h1>
            <div className='text-center my-5'>
                <Link to='/checkout'>
                    <button className='btn btn-outline-primary'>Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetails;