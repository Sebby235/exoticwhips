import React, {useEffect, useState} from 'react';
import CarCard from './CarCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Car({cars}) {

    const carsList = cars.map(c => (
        <Col key={c.id} xs={12} sm={6} md={4} lg={3}>
            <CarCard
                id={c.id}
                image={c.image}
                make={c.make}
                model={c.model}
                year={c.year}
                cost={c.cost}
                orders={c.orders}
                reviews={c.reviews}
            />
        </Col>
    ));
       

    return (
        <Container>
            <Row>{carsList}</Row>
        </Container>
    )
}

export default Car