import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BlogHome from './BlogHome';
import BlogAbout from './BlogAbout';
import BlogArticleList from './BlogArticleList';
import BlogArticle from './BlogArticle';
import ArticlesList from './BlogArticleList';


function Blog() {
    const [navLink, setNavLink] = useState("home");

   


    return (
        <>
            <Navbar bg="light" data-bs-theme="light" style={{ border: "solid black 1px" }}>
                <Container>
                    <Nav className="me-auto justify-content-center flex-column flex-sm-row" style={{ margin: '0 auto' }}>
                        <Nav.Link onClick={() => setNavLink("home")} style={{ margin: '0 10px', color: navLink === "info" ? "red" : "inherit" }}>Home</Nav.Link>
                        <Nav.Link onClick={() => setNavLink("about")} style={{ margin: '0 10px', color: navLink === "cf" ? "red" : "inherit" }}>About</Nav.Link>
                        <Nav.Link onClick={() => setNavLink("articles")} style={{ margin: '0 10px', color: navLink === "cf" ? "red" : "inherit" }}>Articles</Nav.Link>
                       
                    </Nav>
                </Container>
            </Navbar>

            {navLink === "home" ? <BlogHome /> :
                navLink === "about" ? <BlogAbout /> :
                        <ArticlesList />}
        </>
    );
}

export default Blog;
