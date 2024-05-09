import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const CollegeUploadTest = () => {
    const [formData, setFormData] = useState({
        // Other fields...
        
        info: [""],
        
    
      });


      const handleInfoChange = (index, value) => {
        const newInfo = [...formData.info];
        newInfo[index] = value; // Update the entire value, not just a single character
        setFormData({
          ...formData,
          info: newInfo,
        });
      };

      const addInfoField = () => {
        setFormData({
            ...formData,
            info: [...formData.info, ""],
          });
    
      
    };
    
    const removeInfoField = (index) => {
      const newInfo = [...formData.info];
     
    
      newInfo.splice(index, 1);
        setFormData({
          ...formData,
          info: newInfo,
        });
    };
  return (
    <div>
        <div>
  <Form.Label>Informations {<Button size="sm" onClick={addInfoField}>+</Button>}</Form.Label>
  {formData.info.map((infofield, index) => (
    <div key={index} style={{ display: 'flex', marginBottom: '1rem' }}>
      <Form.Control
        type="text"
        value={infofield}
        onChange={(e) => handleInfoChange(index, e.target.value)}
        placeholder={`info ${index + 1}`} // Add a placeholder for clarity
      />
      {formData.info.length > 1 && (
        <Button size="sm" variant="danger" onClick={() => removeInfoField(index)}>x</Button>
      )}
    </div>
  ))}
</div>
    </div>
  )
}

export default CollegeUploadTest