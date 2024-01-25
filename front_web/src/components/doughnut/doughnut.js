// DoughnutChart.js
import React from 'react';
import './doughnut.css';

const DoughnutChart = ({ percentage }) => {
    const strokeWidth = 10;
    const radius = 50;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="doughnut-chart">
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    className="doughnut-chart-circle-background"
                    stroke="#f2f2f2"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    className="doughnut-chart-circle"
                    stroke="#3498db"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }} // Faites tourner de 90 degrés ici
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="doughnut-chart-text">
                {percentage}%
            </div>
        </div>
    );
};

export default DoughnutChart;
