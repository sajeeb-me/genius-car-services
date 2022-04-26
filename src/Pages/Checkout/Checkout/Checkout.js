import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetails from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetails(serviceId);
    const [user] = useAuthState(auth);


    /*     const [user, setUser] = useState({
            name: "Akbar the great",
            email: "akbar@great.com",
            address: "24/A, Akbar Nagar",
            phone: "+008123456",
        })
    
        const handleAddress = e => {
            // console.log(e.target.value)
            const { address, ...rest } = user;
            const newAddress = e.target.value;
            const newUser = { address: newAddress, ...rest }
            setUser(newUser)
        } */

    const handlePlaceOrder = e => {
        e.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }
        axios.post('https://stark-wave-33162.herokuapp.com/orders', order)
            .then(response => {
                // console.log(response)
                const { data } = response;
                if (data.insertedId) {
                    toast.success('Your order is Booked!')
                    e.target.reset()
                }
            })
    }

    return (
        <div className='mt-5 w-50 mx-auto'>
            <h2 className='text-primary text-center mb-4'>Please Book : {service.name}</h2>
            <section>
                <form onSubmit={handlePlaceOrder}>
                    <input className='w-100 mb-2' type="text" value={user?.displayName} name='name' placeholder='Name' required readOnly disabled />
                    <br />
                    <input className='w-100 mb-2' type="email" value={user?.email} name='email' placeholder='Email' required readOnly disabled />
                    <br />
                    <input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='Service' required readOnly disabled />
                    <br />
                    <input className='w-100 mb-2' type="text" name='address' placeholder='Address' autoComplete='off' required />
                    <br />
                    <input className='w-100 mb-2' type="text" name='phone' placeholder='Phone' required />
                    <br />
                    <input className='btn btn-primary' type="submit" value="Place Order" />
                </form>
            </section>
        </div>
    );
};

export default Checkout;