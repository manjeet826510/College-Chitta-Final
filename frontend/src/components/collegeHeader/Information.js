import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Table } from 'react-bootstrap';

const Information = ({college}) => {
 


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
    <Card style={{ width: '90%' }}>
      <Card.Body>
        <Card.Title>{college.name}</Card.Title>
      
        {college.info.map((para)=>{
            return <Card.Text>{para}</Card.Text>
        })}
        <br/>
       
        <Card.Title>{college.shortName} Highlights</Card.Title>
        <Card.Text>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Particulars</th>
          <th>Statistics</th>
        </tr>
      </thead>
      <tbody>
        {college.highlights.map((item)=>{
            return (
                <tr>
          <td>{item.particular}</td>
          <td>{item.stat}</td>
        </tr>
            )
        })
    }
          
      </tbody>
    </Table>
       
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );

  
  
}

export default Information