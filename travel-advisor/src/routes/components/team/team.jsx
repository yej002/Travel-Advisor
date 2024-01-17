import React, { useState } from 'react';
import '../../../css/bootstrap.css';
import '../../../css/style.css';
import WebFont from 'webfontloader';
import teamImage from '../../../images/team.jpg';
import teamImage1 from '../../../images/team1.jpg';
import teamImage2 from '../../../images/team2.jpg';

const Team = () => {
    WebFont.load({
        google: {
            families: ['Raleway:100,300,400,500,700,800', 'Lato:100,300,400,700']
        }
    });

    return (
        <div>
            <section className="team-main-sec py-lg-5 py-4" id="team">
                <div className="container">
                    <div className="inner-sec-wthree py-lg-5 py-4 speak">
                        <div className="text-center">
                            <h3 className="tittle_head">About Our Team </h3>
                            
                        </div>
                        <div className="row mt-lg-5 mt-4">
                            <div className="col-md-4 team-gd-info text-center">
                                <div className="team-gd">
                                    <div className="team-img mb-4">
                                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                    </div>
                                    <div className="team-info">
                                        <h3 className="mt-md-4 mt-3"><span className="sub-tittle-team">Developer</span> Yun You</h3>
                                        <p>Master of Computer Science at Northeastern University</p>
                                        <ul className="team_social_info mt-md-4 mt-3">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <li className="mb-2 facebook"><a href="https://github.com/jerryyummy"><i className="fa fa-facebook mr-1"></i>github</a></li>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <li className="mb-2 twitter"><a href="https://www.linkedin.com/in/yunyou/"><i className="fa fa-twitter mr-1"></i>linkedin</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 team-gd-info text-center">
                                <div className="team-gd">
                                    <div className="team-img mb-4">
                                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                        
                                    </div>
                                    <div className="team-info">
                                        <h3 className="mt-md-4 mt-3"><span className="sub-tittle-team">Developer</span> Tianjiao Wei</h3>
                                        <p>Master of Computer Science at Northeastern University</p>
                                        <ul className="team_social_info mt-md-4 mt-3">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <li className="mb-2 facebook"><a href="https://github.com/sakurawtj"><i className="fa fa-facebook mr-1"></i>github</a></li>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <li className="mb-2 twitter"><a href="https://www.linkedin.com/in/tianjiao-wei-a7a3a61b7/"><i className="fa fa-twitter mr-1"></i>linkedin</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 team-gd-info text-center">
                                <div className="team-gd text-center">
                                    <div className="team-img mb-4">
                                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                        
                                    </div>
                                    <div className="team-info">
                                        <h3 className="mt-md-4 mt-3"><span className="sub-tittle-team">Developer</span> Jing Ye</h3>
                                        <p>Master of Computer Science at Northeastern University</p>
                                        <ul className="team_social_info mt-md-4 mt-3">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <li className="mb-2 facebook"><a href="https://github.com/yej002"><i className="fa fa-facebook mr-1"></i>github</a></li>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <li className="mb-2 twitter"><a href="https://www.linkedin.com/in/jing-ye-002/"><i className="fa fa-twitter mr-1"></i>linkedin</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
};

export default Team;