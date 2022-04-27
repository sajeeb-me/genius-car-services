import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css'

const Services = () => {
    const [services, setServices] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(6);

    useEffect(() => {
        fetch('https://stark-wave-33162.herokuapp.com/services/count')
            .then(res => res.json())
            .then(data => {
                const numbers = data.count;
                setPageCount(Math.ceil(numbers / count))
            })
    }, [count])


    useEffect(() => {
        fetch(`https://stark-wave-33162.herokuapp.com/services?page=${page}&count=${count}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [page, count])


    // useEffect(() => {
    //     fetch('https://stark-wave-33162.herokuapp.com/services')
    //         .then(res => res.json())
    //         .then(data => setServices(data))
    // }, [])
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
            <section className='d-flex justify-content-center my-5'>
                {
                    [...Array(pageCount).keys()].map(numbers => <button
                        key={numbers}
                        onClick={() => setPage(numbers)}
                        className={`btn btn-outline-primary mx-1 ${numbers === page ? 'btn-primary text-white' : ''}`}>
                        {numbers + 1}
                    </button>)
                }
                <select className='border-success rounded mx-1 text-success' defaultValue={6} onChange={e => setCount(e.target.value)}>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                </select>
            </section>
        </div>
    );
};

export default Services;