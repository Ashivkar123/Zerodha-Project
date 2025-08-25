import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h3>Support Portal</h3>
        <a href="">Track tickets</a>
      </div>
      <div className="row p-5 m-3">
        <div className="col-6 p-5">
          <h1 className="fs-3 mb-5">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input className="mb-3" placeholder="Eg: how to i activate F&O, why is my order getting r" /> <br />
          <a href="" style={{ fontSize:"24px"}}>Track account opening</a>
          <a href="" style={{marginLeft:"25px", fontSize:"24px"}}>Track segment activation</a>
          <a href="" style={{marginLeft:"20px", fontSize:"24px"}}>Intraday margins</a><br />
          <a href="" style={{ fontSize:"24px"}}>Kite user manual</a>
        </div>
        <div className="col-6 p-5">
          <h1 className="fs-3">Featured</h1>
          <ol style={{lineHeight:"3"}}>
            <li>
              <a href="">Quarterly Settlement of Funds - July 2025</a>
            </li>
            <li>
              <a href="">
                Exclusion of F&O contracts on 8 securities from August 29, 2025
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
