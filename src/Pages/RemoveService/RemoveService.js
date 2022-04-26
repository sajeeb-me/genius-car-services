import React from 'react';
import useServices from '../../hooks/useServices';

const RemoveService = () => {
    const [services, setServices] = useServices()
    const handleDelete = id => {
        const proceed = window.confirm("Are you sure to delete this service?")
        if (proceed) {
            const url = `https://stark-wave-33162.herokuapp.com/service/${id}`
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    const remaining = services.filter(service => service._id !== id)
                    setServices(remaining)
                })
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Manage your Services</h1>
            {
                services.map(service => <div key={service._id}>
                    <h5>{service.name} <button onClick={() => handleDelete(service._id)}>X</button></h5>
                </div>)
            }
        </div>
    );
};

export default RemoveService;