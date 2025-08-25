import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="comatainer mt-5 p-5">
      <div className="row p-5">
        <div className="col-6 p-5">
          <img src={imageUrl} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo} style={{ textDecoration: "none" }}>
              Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href={learnMore}
              style={{ marginLeft: "50px", textDecoration: "none" }}
            >
              Learn More{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              {" "}
              <img src="media\images\googlePlayBadge.svg" />
            </a>
            <a href={appStore}>
              {" "}
              <img
                src="media\images\appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
