import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Order() {
    const [orders, setOrders] = useState([]);
    const [edititngOrder, setEditingOrder] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5555/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error)
            }
        }
        fetchOrders()
    }, [])

    const handleDelete = (deleteOrderId) => {
        const updatedOrders = orders.filter((order) => order.id !== deleteOrderId);
        setOrders(updatedOrders)
    };

    const handleEdit = (orderId) => {
        setEditingOrder(orderId)
    }

    const handleEditFormClose = () => {
        setEditingOrder(null)
    }

    const orderList = orders.map(o => (
        <Col key={o.id} xs={12} sm={6} md={4} lg={3}>
            <OrderCard 
        key={o.id}
        id={o.id}
        user={o.user.name}
        cost={o.car.cost}
        image={o.car.image}
        make={o.car.make}
        model={o.car.model}
        year={o.car.year}
        handleDelete={handleDelete}
        onEdit={handleEdit}
        />
        </Col>
    ))
    return (
        <Container>
            <Row>{orderList} {edititngOrder}</Row>
        </Container>
    )
}

export default Order

