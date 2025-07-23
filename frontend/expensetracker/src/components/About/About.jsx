import React from 'react'
import './About.css'
import about_img from '../../assets/parent.jpeg'
import playicon from '../../assets/play-icon.png'

const About = ({setPlayState}) => {
  return (
    <div className='about'>
        <div className="about_left">
            <img src={about_img} alt="" className='about-img'/>
            <img src={playicon} alt="" className='play-img' onClick={()=>{setPlayState(true)}}/>
        </div>
        <div className="about_right">
            <h3>About YoungCents</h3>
            <h2>Building Financial Wisdom for Tomorrow’s Adults</h2>
            <p>YoungCents is your partner in raising financially smart kids. Get complete visibility into your child's spending—whether it’s lunch money, school supplies, or digital purchases. Set flexible limits, approve or decline transactions, and get real-time notifications so you’re always in the loop.</p>
            <p>But YoungCents is more than just a monitoring tool—it’s a platform for growth. Turn everyday transactions into meaningful lessons about budgeting, distinguishing between needs and wants, and setting saving goals. With built-in tips, gamified challenges, and reward systems, children stay engaged and motivated to manage money wisely.

.</p>
            <p>Our intuitive dashboard bridges the gap between parents and kids. Assign allowances, track spending patterns, and celebrate milestones together. Whether it's saving for a new bike or learning the importance of emergency funds, YoungCents fosters a collaborative, transparent, and empowering approach to financial education.</p>
       <p>Together, let’s build the foundation for a lifetime of financial confidence.</p>
        </div>

    </div>
  )
}

export default About