import React from 'react';
import './Programs.css';
import f1 from '../../assets/clean.jpeg';
import f3 from '../../assets/reliable.jpeg';
import f2 from '../../assets/reports.jpeg';
import program_icon1 from '../../assets/c.png';
import program_icon2 from '../../assets/r.png';
import program_icon3 from '../../assets/p.png';

const Programs = () => {
  return (
    <div className='programs'>
      <div className='program'>
        <img src={f1} alt="Scholarship Support" />
        <div className='caption'>
          <img src={program_icon1} alt="icon" />
          <p>Clarity</p>
        </div>
        <div className='program-text'>
          <h3>Clean Interface</h3>
          <p>Enjoy a clutter-free and intuitive interface that makes managing your finances a breeze.</p>
        </div>
      </div>

      <div className='program'>
        <img src={f2} alt="Mentorship Programs" />
        <div className='caption'>
          <img src={program_icon2} alt="icon" />
          <p>Insights</p>
        </div>
        <div className='program-text'>
          <h3>Comprehensive Reports</h3>
          <p>Access detailed reports and analytics to gain insights into your spending habits.</p>
        </div>
      </div>

      <div className='program'>
        <img src={f3} alt="Global Recognition" />
        <div className='caption'>
          <img src={program_icon3} alt="icon" />
          <p>Reliablity</p>
        </div>
        <div className='program-text'>
          <h3>Reliable Performance</h3>
          <p>Experience consistent and reliable performance to keep your financial data up to date.</p>
        </div>
      </div>
    </div>
  );
};

export default Programs;
