import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import m from '../../assets/mail-icon.png'
import p from '../../assets/phone-icon.png'
import l from '../../assets/location-icon.png'
import arrow from '../../assets/white-arrow.png'


const Contact = () => {
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "18461639-740c-4ca8-986b-6cf20064b5c6");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    
    <div className='contact'>
        <div className="contact_col">
            <h3>Send us a message <img src={msg_icon} alt="" /></h3>
            <p>Get in touch with our team to start managing your child’s finances better today.

            </p>
            <ul>
                <li><img src={m} alt="" />email</li>
                <li><img src={p} alt="" />phone</li>
                <li><img src={l} alt="" />address</li>
            </ul>
        </div>
        <div className="contact_col">
            <form onSubmit={onSubmit}>
                <label > Your Name</label>
                <input type="text" name='name' placeholder='Enter your name' required />
                <label>Phone number</label>
                <input type="tel" name='phone' placeholder='Enter your phone' required />
                <label>Write your Message here</label>
                <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
                <button type='submit' className='btn dark-btn'>Submit now <img src={arrow} alt="" /></button>
            </form>
            <span>{result} </span>
        </div>
    </div>
    
  )
}

export default Contact