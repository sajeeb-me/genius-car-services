import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        // console.log(data)
        fetch('http://localhost:5000/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    };
    return (
        <div className='w-50 mx-auto my-5'>
            <h3 className='text-center'>Please Add a services</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                <input className='mb-2' placeholder='Service Name' {...register("name", { required: true, maxLength: 20 })} />
                <input className='mb-2' placeholder='Price' type="number" {...register("price", { required: true, })} />
                <textarea className='mb-2' placeholder='Add Description' type="number"{...register("description", { required: true, })} />
                <input className='mb-2' placeholder='Image url' {...register("img", { required: true, })} />
                <input type="submit" value='Add service' />
            </form>
        </div>
    );
};

export default AddService;