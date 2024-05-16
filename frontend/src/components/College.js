import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";


import Modal from 'react-bootstrap/Modal';
import { Helmet } from "react-helmet-async";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      dialogClassName="modal-90w" // Apply custom CSS class for width
      contentClassName="modal-90h" // Apply custom CSS class for height
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header className="modal-header-custom" closeButton>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        {/* Embed YouTube video */}
        <iframe width="1000" height="500" src="https://www.youtube.com/embed/iPgWHPsI28I?si=mZg8XQ2d8giZ-4nh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Modal.Body>
    </Modal>
  );
}



// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }



const College = (props) => {
  const { college } = props;
  const [modalShow, setModalShow] = React.useState(false);
  
  const visitCollege = async (item) => {
    window.alert("Welcome");
  };
  return (
    <>
    
    <Card  className="college-card" style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: 'center' }}>
      <Link to={`/college/${college.slug}`}>
        <img src={college.image}
         alt={college.name} 
         className="card-img-top" 
         />
      </Link>
      <Card.Body  style={{ width: '100%'}}>
        <Link to={`/college/${college.slug}`} style={{textDecoration: 'none', color: 'black'}}>
          <Card.Title className="college-card-font-mobile-name" >{college.name}</Card.Title>
        </Link>
        <Card.Text className="college-card-font-mobile-rating">Rating: {college.rating}</Card.Text>
        
        
      </Card.Body>
      <div style={{ width: '100%'}}>
      <Button style={{marginLeft: '1rem', marginBottom:'1rem'}}  variant="dark" className="visit-college-btn" href={college.videoReviewLink} target="__blank">Video Review</Button>
      </div>
    </Card>
    <MyVerticallyCenteredModal
    show={modalShow}
    onHide={() => setModalShow(false)}
  />
  </>
  );
};

export default College;
