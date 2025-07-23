import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Programs from '../components/Programs/Programs';
import Title from '../components/Title/Title';
import About from '../components/About/About';
import Campus from '../components/Campus/Campus';
import Testimonial from '../components/Testimonial/Testimonial';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import HomeBtn from '../components/Button/HomeBtn';
import './homepage.css';


const Homepage = () => {
  const [playState, setPlayState] = useState(false);

  return (
    <div className="homepage">
  
    <Navbar />
    <Hero />
    <div className="container">
      <Title subTitle="Our Features" title="What YoungCent Offers" />
      <Programs />
      <About setPlayState={setPlayState} />
      <Title
        subTitle="Get a visual walkthrough of how the expense tracker works – intuitive, secure, and insightful."
        title="One-Stop Glimpse Into Our Tracker"
      />
      <Campus />
      <Title subTitle="Testimonials" title="Let's hear what our users have to say" />
      <Testimonial />
      <Title subTitle="Contact us" title="Get in touch" />
      <Contact />
      <Footer />
    </div>

    {/* Remove or fix this if unused */}
    <video playState={playState} setPlayState={setPlayState} />
  </div>
 
);
};

export default Homepage;
