import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth)
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getOrders = async () => {
            const url = `http://localhost:5000/orders?email=${user.email}`
            try {
                const { data } = await axiosPrivate.get(url)
                setOrders(data)
            } catch (error) {
                console.log(error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth)
                    navigate('/login')
                }
            }
        }
        getOrders();
    }, [user])
    return (
        <div>
            <h1>Your Orders : {orders.length}</h1>
        </div>
    );
};

export default Orders;