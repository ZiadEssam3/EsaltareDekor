import React from 'react';
import './Title.css'
const Title = ({ title }) => {
    return (
        <div className="ED-section-header">
            <h2 className="ED-section-title">{title}</h2>
            <span className="ED-line"></span>
        </div>
    );
};

export default Title;
