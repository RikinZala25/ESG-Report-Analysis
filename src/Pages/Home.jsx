import { Link } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="banner-container">
        <div className="banner">
          <h2>Invest Responsibly</h2>
          <div className="banner_btn">
            <Link to="/allocation">
              <div className="btn">Allocate Capital</div>
            </Link>
            <Link to="/ratings">
              <div className="btn">View Ratings</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-tools">
        <div className="cocktails-container">
          <div className="cocktail-card">
            <img
              alt=""
              className="cocktail-img"
              src="images/chart_finance.png"
            />
            <div className="cocktail-info">
              <div className="content-text">
                <h3 className="cocktail-name">
                  Allocation Using Renowned Finance Theories.
                </h3>
                <span className="info"></span>
              </div>
            </div>
            <Link to="/products">
              <div className="btn">Learn More</div>
            </Link>
          </div>
        </div>

        <div className="cocktails-container">
          <div className="cocktail-card">
            <img alt="" className="cocktail-img" src="images/leaf.png" />
            <div className="cocktail-info">
              <div className="content-text">
                <h3 className="cocktail-name">
                  Proprietary ESG scores with Bloomberg sourced data.
                </h3>
                <span className="info"></span>
              </div>
            </div>
            <Link to="/products">
              <div className="btn">Learn More</div>
            </Link>
          </div>
        </div>

        <div className="cocktails-container">
          <div className="cocktail-card">
            <img alt="" className="cocktail-img" src="images/programming.png" />
            <div className="cocktail-info">
              <div className="content-text">
                <h3 className="cocktail-name">
                  Coded in Python with React, Flask, and more.
                </h3>
                <span className="info"></span>
              </div>
            </div>
            <Link to="/products">
              <div className="btn">Learn More</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
