import React, { useState } from 'react';
import './bootstrap.css';
import './style.css';
import WebFont from 'webfontloader';

const CONTACT = () => {

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // eslint-disable-next-line no-restricted-globals
    addEventListener("load", function() {
        setTimeout(hideURLbar, 0);
    }, false);

    function hideURLbar() {
        window.scrollTo(0, 1);
    }

    WebFont.load({
        google: {
            families: ['Raleway:100,300,400,500,700,800', 'Lato:100,300,400,700']
        }
    });

    const submit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        const formData = {
            email,
            subject,
            message,
        };
        console.log(formData)
        try {
            const response = await fetch('/contact/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            setSubject('');
            setEmail('');
            setMessage('');
            alert("Thank you for contacting us. Your message is well received!");
        } catch (error) {
            console.error('Error:', error);
            // Handle errors - display error message to user
        }
    }

    return (
        <section className="wedo py-lg-5 py-5">
            <div className="container py-lg-5 py-3">
                <div className="text-center">
                    <h3 className="tittle_head">Contact Us</h3>
                    <p className="main_p mt-4 mb-4 pt-2 text-center mx-auto">TRAVEL ADVISOR, OFFER THE BEST SERVICE FOR YOU</p>
                </div>
                <div className="contact-info row py-5">
                    <div className="col-lg-6 mt-lg-0 mt-5">
                        <div className="contact-right">
                            <h2 className="mb-3">Dont hesitate to contact us for any kind of information</h2>
                            <p><span className="fas mr-2 fa-mobile-alt"></span> +12 327 8976 2334</p>
                        </div>
                    </div>
                    <div className="col-lg-6 contact-form">
                        <form onSubmit={submit}>
                            <div className="fields-grid">
                                <div className="styled-input agile-styled-input-top">
                                    <label htmlFor="subject">Subject *</label>
                                    <input type="text" id="subject" className="form-control" value={subject} onChange={event => setSubject(event.target.value)} />
                                </div>
                                <div className="styled-input">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email" className="form-control"  id="email" value={email} onChange={event => setEmail(event.target.value)} />

                                </div>

                                <div className="styled-input mb-4">
                                    <label htmlFor="message">How can we help?</label>
                                    <textarea className="form-control" id="message" value={message} onChange={event => setMessage(event.target.value)}></textarea>

                                </div>
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
                <div className="map mt-md-5">
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    {<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.504763225593!2d-122.33516748436988!3d47.60801307918442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C+WA%2C+USA!5e0!3m2!1sen!2sin!4v...&language=en"
                             className="map" style={{ border: 0 }} allowFullScreen=""></iframe>}
                </div>
            </div>
        </section>
    );

};

export default CONTACT;