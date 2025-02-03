import React from 'react';
import {  useNavigate } from 'react-router-dom';

const GradeCardButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/grade-card');
    };

    return (
        <button className="btn btn-info btn-sm" onClick={handleClick}>
            <i className="fa fa-eye"></i> Grade Card
        </button>
    );
};

export default GradeCardButton;
