import React from 'react'
import { Card, Table } from 'react-bootstrap'

const CoursesFees = ({college}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
    <Card style={{ width: '75rem' }}>
      <Card.Body>
        <Card.Title style={{marginBottom: "1rem"}}>{college.shortName} Fees & Eligibility</Card.Title>
        <Card.Text>
        <Table striped bordered hover>
      <thead>
      <tr>
        
            <th>Course</th>
            <th>Fees</th>
            <th>Eligibility</th>
        
    </tr>
      </thead>
      <tbody>
        {college.coursesAndFees.map((item)=>{
            return (
                <tr>
          <td>{item.Course}</td>
          <td>{item.Fees}</td>
          <td>{item.Eligibility}</td>
        </tr>
            )
        })}
      </tbody>
    </Table>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default CoursesFees