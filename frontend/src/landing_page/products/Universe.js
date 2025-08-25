import React from "react";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mt-5 universe-image">
          <img src="media\images\smallcaseLogo.png" />
          <p className="text-small text-muted">Thematic inventing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
        </div>
        <div className="col-4 p-3 mt-5 universe-image">
          <img src="media\images\streakLogo.png" />
          <p className="text-small text-muted">Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
        <div className="col-4 p-3 mt-5 universe-image">
          <img src="media\images\dittoLogo.png" />
          <p className="text-small text-muted">Personalized advice on life and health insurance. No spam and no mis-selling.</p>
        </div>
        <div className="col-4 p-3 universe-image">
          <img src="media\images\zerodhaFundhouse.png" />
          <p className="text-small text-muted">Our asset management venture that is craeting simple and transparent index funds to help you save for your goals.</p>
        </div>
        <div className="col-4 p-3 universe-image">
          <img src="media\images\sensibullLogo.svg" />
          <p className="text-small text-muted">Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.</p>
        </div>
        <div className="col-4 p-3 universe-image">
          <img src="media\images\tijori.png" />
          <p className="text-small text-muted">investment reasearch platforms that offers detailed insights on stocks, sectors, supply chains, and more.</p>
        </div>
        <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"20%", margin:"0 auto"}}>Signup Now</button>
      </div>
    </div>
  );
}

export default Universe;
