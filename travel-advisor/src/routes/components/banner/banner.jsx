import React, { useState } from 'react';
import '../../../css/bootstrap.css';
import '../../../css/style.css';
import WebFont from 'webfontloader';

const Banner = () => {
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

    return (
        <>
            {/* Main Banner Section */}
            <section className="main-banner" id="home">
                <div className="container">
                    <div className="baner-info-w3ls text-left">
                        <h1><label>Travel Advisor</label></h1>
                        <h6><label>A cutting-edge web application designed to revolutionize the way individuals plan and experience travel.</label></h6>
                    </div>
                </div>
            </section>
            <br/><br/><br/><br/><br/>
            {/* Banner Bottom Section 1 */}
            <section className="banner-bottom" id="news">
                <div className="banner-top row middle-grids">
                    <div className="col-lg-4 advantage-grid-info1">
                        <div className="advantage_left2 text-center">

                        </div>
                    </div>
                    <div className="col-lg-8 advantage-grid-info">
                        <div className="advantage_left">
                            <h3>Travel Journal and Sharing: <br />Anthony Bourdain:</h3>
                            <p className="mt-4">Travel changes you. As you move through this life and this world, you change things slightly, you leave marks behind, however small. And in return, life – and travel – leaves marks on you</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Banner Bottom Section 2 */}
            <section className="banner-bottom temp-btm">
                <div className="banner-top row middle-grids">
                    <div className="col-lg-8 advantage-grid-info">
                        <div className="advantage_left">
                            <h3>Discovering Your Dream <br />Mark Twain</h3>
                            <p className="mt-4">Travel is fatal to prejudice, bigotry, and narrow-mindedness, and many of our people need it sorely on these accounts. Broad, wholesome, charitable views of men and things cannot be acquired by vegetating in one little corner of the earth all one’s lifetime</p>
                        </div>
                    </div>
                    <div className="col-lg-4 advantage-grid-info1 second">
                        <div className="advantage_left2 text-center">

                        </div>
                    </div>
                </div>
            </section>
            {/* Banner Bottom Section 3 */}
            <section className="banner-bottom">
                <div className="banner-top row middle-grids">
                    <div className="col-lg-4 advantage-grid-info1 third">
                        <div className="advantage_left2 text-center">

                        </div>
                    </div>
                    <div className="col-lg-8 advantage-grid-info">
                        <div className="advantage_left">
                            <h3>Intelligent Customization<br />Saint Augustine</h3>
                            <p className="mt-4">The world is a book, and those who do not travel read only one page.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

};

export default Banner;