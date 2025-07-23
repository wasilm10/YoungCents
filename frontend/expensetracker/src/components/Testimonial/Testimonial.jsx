import React, { useRef } from 'react'
import './Testimonial.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import u1 from '../../assets/user-1.png'
import u2 from '../../assets/user-2.png'
import u3 from '../../assets/user-3.png'
import u4 from '../../assets/user-4.png'


const Testimonial = () => {
    const slider = useRef();
    const tx = useRef(0);

    const sliderforward = () => {
        if (tx.current > -50) {
            tx.current -= 25;
        }
        slider.current.style.transform = `translateX(${tx.current}%)`;
    }

    const sliderbackward = () => {
        if (tx.current < 0) {
            tx.current += 25;
        }
        slider.current.style.transform = `translateX(${tx.current}%)`;
    }

    return (
     
        <div className='testimonials'>
            <img src={next_icon} alt="" className='next-btn' onClick={sliderforward} />
            <img src={back_icon} alt="" className='back-btn' onClick={sliderbackward} />
            <div className="slider">
                <ul ref={slider}>
                    {[u1, u2, u3, u4].map((userImg, index) => (
                        <li key={index}>
                            <div className='slide'>
                                <div className="userinfo">
                                    <img src={userImg} alt="" />
                                    <div>
                                        <h3>John Affleck</h3>
                                        <span>Bengaluru, India</span>
                                    </div>
                                </div>
                                <p>
                                    "With SpendGuard, I always know how my son is managing his pocket money. It’s helped us talk more openly about saving and budgeting."


                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default Testimonial
