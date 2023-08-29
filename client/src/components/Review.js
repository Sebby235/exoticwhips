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

    const handleDelete = (deleteReviewId) => {
        const updatedReviews = reviews.filter((review) => review.id !== deleteReviewId);
        setReviews(updatedReviews)
    };

    const reviewList = reviews.map(r => (
        <Col key={r.id} xs={12} sm={6} md={4} lg={3}>
            <ReviewCard
                id={r.id}
                user={r.user ? r.user.name : 'Anonymous'}
                comment={r.comment}
                review={r}
                updateReview={updateReview}
                editReview={editReview}
                handleDelete={handleDelete}
            />
        </Col>
    ))

    return (
        <div className='banner'>
        <ReviewForm addReview={addReview} />
        <Container>
            <Row>{reviewList}</Row>
        </Container>
        </div>
        
    )
}

export default Review
