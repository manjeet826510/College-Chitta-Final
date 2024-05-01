import React from 'react'
import { Card, Table } from 'react-bootstrap'

const WBJEECutoff = ({college}) => {
    // console.log(college);
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
    <Card style={{ width: '75rem' }}>
      <Card.Body>
        <Card.Title style={{marginBottom: "1rem"}}>{college.shortName} {college.cutoff[1].cutoffName} Cutoff 2023</Card.Title>
        <Card.Text>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Course</th>
          <th>Cutoff</th>
        </tr>
      </thead>
      <tbody>
        {college.cutoff[1].stat.map((item)=>{
            return (
                <tr>
          <td>{item.course}</td>
          <td>{item.cutoff2023}</td>
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

export default WBJEECutoff