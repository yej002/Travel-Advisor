import React, { useState } from 'react';
import '../../../css/bootstrap.css';
import '../../../css/style.css';
import WebFont from 'webfontloader';

const Service = () => {
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
        <div>
            <section className="slide-wrapper py-5" id="service">
                
            </section>
        </div>
    )
};

export default Service;