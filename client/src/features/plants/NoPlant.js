import React from "react";
import Rosepic from "../../rosepic.png"


const NoPlant = () => {
  return (
    <>
      <br />
      <br />
      <div className="editBox">
        <br />
        <h1>
          Sorry to say that our databases don't contain information about your
          plant!
        </h1>
        <img src={Rosepic} className='rosepic'/>
        <h2>
          Feel free to email me and I'll do my best to add your plant to your
          account ASAP
        </h2>
        <h1>Please provide: </h1>
        <ol>
          <h2>
            <li>The plant's common name </li>
          </h2>
          <h2>
            <li>(optional) The plant's scentific name </li>
          </h2>
        </ol>
        <h2>You're welcome to list multiple plants you want added.</h2>
        <h2> Thank you for using Vine Voice!</h2>
        <a href="mailto:vinevoice@yahoo.com">
          <h2>Send Email</h2>
        </a>
        <br />
      </div>
    </>
  );
};

export default NoPlant;
