import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";
import { toast } from "react-toastify";
import getError from "../utils";
import { useNavigate } from "react-router-dom";

const CollegeUpload = () => {
    const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    // Other fields...
    name: "", 
    sname: "", 
    slug: "", 
    rating: "", 
    location: "", 
    city: "", 
    reviewLink: "",
    highlights: [{ particular: "", stat: "" }],
    logoUrl: "",
    imageUrl: "",
    info: [""],
    coursesAndFees: [{ Course: "", Fees: "", Eligibility: "" }],
    cutoff: [{ cutoffName: "", tag: "", stat: [{ course: "", cutoff2023: "" }]}]

  });



  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const { data } = await axios.post(
        "/api/colleges",
        {
            name: formData.name, 
            sname: formData.sname, 
            slug: formData.slug, 
            rating: formData.rating, 
            location: formData.location, 
            city: formData.city, 
            reviewLink: formData.reviewLink,
            highlights: formData.highlights,
            logoUrl: formData.logoUrl,
            imageUrl: formData.imageUrl,
            info: formData.info,
            coursesAndFees: formData.coursesAndFees,
            cutoff: formData.cutoff

         
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      if(userInfo && userInfo.isAdmin) navigate('/admin/collegelist');
      if(userInfo && userInfo.isCounsellor) navigate('/counsellor/collegelist');
      toast.success("College uploaded successfully");
      console.log(data);
      // navigate(`/admin/product/${data.product._id}`)
      // console.log("product created");
    } catch (err) {
      toast.error(getError(err));
    }
    // Handle form submission and data saving here
    // ...
    // Reset form data and close the popup
    setFormData({
        name: "", 
        sname: "", 
        slug: "", 
        rating: "", 
        location: "", 
        city: "", 
        reviewLink: "",
        highlights: [{ particular: "", stat: "" }],
        logoUrl: "",
        imageUrl: "",
        info: [""],
        coursesAndFees: [{ Course: "", Fees: "", Eligibility: "" }],
        cutoff: [{ cutoffName: "", tag: "", stat: [{ course: "", cutoff2023: "" }]}]
    });
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  


//   Info array starts here
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

// Info arr end here
  // Function to handle changes in particular and stat fields
  const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index][field] = value;
    setFormData({
      ...formData,
      highlights: newHighlights,
    });
  };

  // Function to add a new highlight pair
  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { particular: "", stat: "" }],
    });
  };

  // Function to remove a highlight pair
  const removeHighlight = (index) => {
    const newHighlights = [...formData.highlights];
    newHighlights.splice(index, 1);
    setFormData({
      ...formData,
      highlights: newHighlights,
    });
  };

  // Function to handle changes in Course fields
  const handleCourseChange = (index, field, value) => {
    const newCourses = [...formData.coursesAndFees];
    newCourses[index][field] = value;
    setFormData({
      ...formData,
      coursesAndFees: newCourses,
    });
  };

  // Function to add a new Course triplet
  const addCourse = () => {
    setFormData({
      ...formData,
      coursesAndFees: [...formData.coursesAndFees, { Course: "", Fees: "", Eligibility: "" }],
    });
  };

  // Function to remove a Course triplet
  const removeCourse = (index) => {
    const newCourses = [...formData.coursesAndFees];
    newCourses.splice(index, 1);
    setFormData({
      ...formData,
      coursesAndFees: newCourses,
    });
  };

  const addCutoff = () => {
    setFormData({
      ...formData,
      cutoff: [
        ...formData.cutoff,
        {
          cutoffName: "",
          tag: "",
          stat: [{ course: "", cutoff2023: "" }]
        }
      ]
    });
  };

  const addStat = (cutoffIndex) => {
    const newCutoffs = [...formData.cutoff];
    newCutoffs[cutoffIndex].stat.push({ course: "", cutoff2023: "" });
    setFormData({
      ...formData,
      cutoffs: newCutoffs
    });
  };

  const removeStat = (cutoffIndex, statIndex) => {
    const newCutoffs = [...formData.cutoff];
    newCutoffs[cutoffIndex].stat.splice(statIndex, 1);
    setFormData({
      ...formData,
      cutoffs: newCutoffs
    });
  };

  const removeCutoff = (cutoffIndex) => {
    const newCutoffs = [...formData.cutoff];
    newCutoffs.splice(cutoffIndex, 1);
    setFormData({
      ...formData,
      cutoff: newCutoffs
    });
  };

  const handleCutoffChange = (cutoffIndex, field, value) => {
    const newCutoffs = [...formData.cutoff];
    newCutoffs[cutoffIndex][field] = value;
    setFormData({
      ...formData,
      cutoff: newCutoffs
    });
  };

  const handleStatChange = (cutoffIndex, statIndex, field, value) => {
    const newCutoffs = [...formData.cutoff];
    newCutoffs[cutoffIndex].stat[statIndex][field] = value;
    setFormData({
      ...formData,
      cutoff: newCutoffs
    });
  };
  

  return (
  
    <Container >
      {/* <Helmet>
        <title>Sign In</title>
      </Helmet> */}
      <br/>
      <h1 className="my-3">Fill College Details</h1>
      <Form onSubmit={handleSubmit}>

        {/* name */}

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

        {/* shortName */}

        <Form.Group>
          <Form.Label>Short Form Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="sname"
            value={formData.sname}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

        {/* slug */}

        <Form.Group>
          <Form.Label>Slug</Form.Label>
          <Form.Control
            required
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

        {/* rating */}

        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            required
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

        {/* location */}

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>


        {/* city */}

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

        {/* videoReviewLink */}

        <Form.Group>
          <Form.Label>Video Review YouTube Link</Form.Label>
          <Form.Control
            required
            type="text"
            name="reviewLink"
            value={formData.reviewLink}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

    
    {/* highlights */}


        <div>
            <Form.Label>Highlights {<Button size="sm" onClick={addHighlight}>
          +
        </Button>}</Form.Label>
        {formData.highlights.map((highlight, index) => (
          <div key={index} style={{display: 'flex', marginBottom: '1rem'}}>
            <Form.Control
                required
              type="text"
              value={highlight.particular}
              onChange={(e) =>
                handleHighlightChange(index, "particular", e.target.value)
              }
              placeholder="Particular"
            />
            <Form.Control
                required
              type="text"
              value={highlight.stat}
              onChange={(e) =>
                handleHighlightChange(index, "stat", e.target.value)
              }
              placeholder="Stat"
            />
            {
                formData.highlights.length > 1 && (
                    <Button size="sm" variant="danger" onClick={() => removeHighlight(index)}>
                       x
                    </Button>
                )
            }
            
          </div>
        ))}
        
      </div>

    {/* logo */}

      <Form.Group>
          <Form.Label>Logo URL</Form.Label>
          <Form.Control
            required
            type="text"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

    {/* image */}

      <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            required
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

    {/* info */}

    <div>
  <Form.Label>Informations {<Button size="sm" onClick={addInfoField}>+</Button>}</Form.Label>
  {formData.info.map((infofield, index) => (
    <div key={index} style={{ display: 'flex', marginBottom: '1rem' }}>
      <Form.Control
        required
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

    {/* coursesAndFees */}

  <div>
            <Form.Label>Courses And Fees {<Button size="sm" onClick={addCourse}>
          +
        </Button>}</Form.Label>
        {formData.coursesAndFees.map((coursesAndFee, index) => (
          <div key={index} style={{display: 'flex', marginBottom: '1rem'}}>
            <Form.Control
                required
              type="text"
              value={coursesAndFee.Course}
              onChange={(e) =>
                handleCourseChange(index, "Course", e.target.value)
              }
              placeholder="Course Name"
            />
            <Form.Control
                required
              type="text"
              value={coursesAndFee.Fees}
              onChange={(e) =>
                handleCourseChange(index, "Fees", e.target.value)
              }
              placeholder="Fee"
            />
            <Form.Control
                required
              type="text"
              value={coursesAndFee.Eligibility}
              onChange={(e) =>
                handleCourseChange(index, "Eligibility", e.target.value)
              }
              placeholder="Eligibility"
            />
           
            {
                formData.coursesAndFees.length > 1 && (
                    <Button size="sm" variant="danger" onClick={() => removeCourse(index)}>
                       x
                    </Button>
                )
            }
            
          </div>
        ))}
        
      </div>


    {/* cutoff */}

  <div>
  <Form.Label>
    College Cutoff{" "}
    <Button size="sm" onClick={addCutoff}>
      +
    </Button>
  </Form.Label>

  <div style={{ marginBottom: "1rem" }}>
    {formData.cutoff.map((cutoff, cutoffIndex) => (
      <div key={cutoffIndex} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", marginBottom: "0.5rem" }}>
          <Form.Control
            required
            type="text"
            value={cutoff.cutoffName}
            onChange={(e) =>
              handleCutoffChange(cutoffIndex, "cutoffName", e.target.value)
            }
            placeholder="Cutoff Type"
          />
          <Form.Control
            required
            type="text"
            value={cutoff.tag}
            onChange={(e) =>
              handleCutoffChange(cutoffIndex, "tag", e.target.value)
            }
            placeholder="Tag"
          />
          {formData.cutoff.length > 1 && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => removeCutoff(cutoffIndex)}
            >
              x
            </Button>
          )}
        </div>

        <div style={{ marginLeft: "1.5rem", marginBottom: "1rem", marginRight: "1.5rem" }}>
          <Form.Label>
            Cutoff Stat{" "}
            <Button size="sm" onClick={() => addStat(cutoffIndex)}>
              Add Stat
            </Button>
          </Form.Label>

          {cutoff.stat.map((stat, statIndex) => (
            <div key={statIndex} style={{ marginBottom: "0.5rem", display: 'flex' }}>
              <Form.Control
                required
                type="text"
                value={stat.course}
                onChange={(e) =>
                  handleStatChange(
                    cutoffIndex,
                    statIndex,
                    "course",
                    e.target.value
                  )
                }
                placeholder="Course Name"
              />
              <Form.Control
                required
                type="text"
                value={stat.cutoff2023}
                onChange={(e) =>
                  handleStatChange(
                    cutoffIndex,
                    statIndex,
                    "cutoff2023",
                    e.target.value
                  )
                }
                placeholder="Cutoff 2023"
              />
              {cutoff.stat.length > 1 && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeStat(cutoffIndex, statIndex)}
                >
                  x
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
<br/>
<br/>
<br/>

        
       
        <div className="mb-3">
          <Button variant="dark" type="submit">Upload College</Button>
        </div>
        
      </Form>
      <br/>
    </Container>
    
 
  );
};

export default CollegeUpload;
