import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css'

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://stark-wave-33162.herokuapp.com/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div id='services' className='container'>
            <h1 className='services-title text-primary text-center py-5'>Our Services</h1>
            <section className='services-container'>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    />)
                }
            </section>
        </div>
    );
};

export default Services;