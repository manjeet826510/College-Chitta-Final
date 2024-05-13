import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AuthorsSection = () => {
    return (
        <section id="authors" className="py-5">
            <Container>
                <h2 className="text-center mb-4">Our Authors</h2>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {authors.map((author, index) => (
                        <Col key={index}>
                            <Card className="h-100" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                               
                                <Card.Img  style={{height: '60%', width: '60%', marginTop: '1rem'}}  src={author.image} alt={author.name} />
                               
                                <Card.Body>
                                    <Card.Title>{author.name}</Card.Title>
                                    <Card.Text>{author.bio}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="text-muted">Joined {author.joined}</div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default AuthorsSection;

// Sample author data
const authors = [
    {
        name: 'Yezdaan Mahfuz',
        image: '/images/yezdan.jpg',
        bio: 'Content Writer for Articles and Admin at College Chitta',
        joined: '2024',
    },
    {
        name: 'Maharufh',
        image: '/images/maharufh.jpg',
        bio: 'Content Writer for Articles and Admin at College Chitta',
        joined: '2024',
    },
    {
        name: 'Rahul',
        image: '/images/rahul.jpg',
        bio: 'Content Writer for Articles and Admin at College Chitta',
        joined: '2024',
    },
    {
        name: 'Manjeet',
        image: '/images/manjeet.jpg',
        bio: 'Content Writer for Articles and Admin at College Chitta',
        joined: '2024',
    },
];
