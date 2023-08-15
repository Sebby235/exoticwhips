import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReviewForm from './ReviewForm'

function Review() {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5555/reviews')
            .then(r => r.json())
            .then(allReviews => setReviews(allReviews))
    }, [])

    const addReview = (newReview) => {
        setReviews([...reviews, newReview])
    }

    const updateReview = (updatedReview) => {
        setReviews(reviews.map((r) => (r.id === updatedReview.id ? updatedReview : r)))
    }

    const editReview = (updatedReview) => {
        setReviews(reviews.map(r => r.id === updatedReview.id ? updatedReview : r))
    }

    const reviewList = reviews.map(r => (
        <Col key={r.id} xs={12} sm={6} md={4} lg={3}>
            <ReviewCard
                id={r.id}
                user={r.user}
                comment={r.comment}
                review={r}
                updateReview={updateReview}
                editReview={editReview}
            />
        </Col>
    ))

    return (
        <div>
        <Container>
            <Row>{reviewList}</Row>
        </Container>
        <ReviewForm addReview={addReview} />
        </div>
        
    )
}

export default Review