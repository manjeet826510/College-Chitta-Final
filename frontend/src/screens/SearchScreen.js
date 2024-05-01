import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import SearchedColleges from "./SearchedColleges";
import CollegeNotFoundSearch from "./CollegeNotFoundSearch";
import Spinner from 'react-bootstrap/Spinner';
import MessageBox from "../components/MessageBox";


const SearchScreen = () => {
    const loc = useLocation();
    const { search } = loc;
    const [collegeData, setCollegeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCollegeData = async () => {
            try {
                const { data } = await axios.get('/api/colleges');
                setCollegeData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching college data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        getCollegeData();
    }, []);

    const searchCollegeName = decodeURIComponent(search.slice(8)); // Remove '?search=' from the search string
    const searchCollegeNameLowerCase = searchCollegeName.toLowerCase().trim();

    // Filter colleges based on the search term
    const matchedColleges = collegeData.filter(college => {
        const collegeNameLowerCase = college.name.toLowerCase();
        return collegeNameLowerCase.includes(searchCollegeNameLowerCase);
    });

    if (error) {
        return <MessageBox variant="danger">{error}</MessageBox>;
    }

    if (loading) {
        return <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>;
    }


    return (
        <div>
            {matchedColleges.length === 0 ? (
                <CollegeNotFoundSearch />
            ) : (
                <SearchedColleges colleges={matchedColleges} />
            )}
        </div>
    );
};

export default SearchScreen;
