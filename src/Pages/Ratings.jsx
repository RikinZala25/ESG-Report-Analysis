import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./css/Ratings.css";
import CreatableSelect from "react-select/creatable";
import options from "./assets/options";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="rating-container">
      <div className="rating-banner-container">
        <div className="rating-banner">
          <img alt="" className="rating-cocktail-img" src="images/leaf.png" />
          <h2>ESG Stock Ratings</h2>
          <img alt="" className="rating-cocktail-img" src="images/leaf.png" />
        </div>
      </div>

      <div className="rating-banner-container">
        <CreatableSelect
          isClearable
          placeholder="Select a stock"
          className="select-btn"
          value={selectedOption}
          options={options}
          onChange={(selected) => setSelectedOption(selected)}
        />
        <Link to={`/ratings/${selectedOption?.value}`}>
          <div className="btn">See Rating</div>
        </Link>
      </div>

      <div className="rating-container-tools">
        <div className="rating-cocktails-container">
          <div className="rating-cocktail-card">
            <img
              alt=""
              className="rating-cocktail-img-ad"
              src="images/env_logo.png"
            />
            <div className="rating-cocktail-info">
              <div className="content-text">
                <h3 className="rating-cocktail-name">Environmental</h3>
                <ul className="des-list">
                  <li>Pollution Emissions</li>
                  <li>Sustainable Initiatives</li>
                  <li>Passing Regulations</li>
                </ul>
                <span className="info"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="rating-cocktails-container">
          <div className="rating-cocktail-card">
            <img
              alt=""
              className="rating-cocktail-img-ad"
              src="images/soc_logo.png"
            />
            <div className="rating-cocktail-info">
              <div className="content-text">
                <h3 className="rating-cocktail-name">Social</h3>
                <ul className="des-list">
                  <li>Ethical Initiatives</li>
                  <li>Human Rights</li>
                  <li>Proper Conditions</li>
                </ul>
                <span className="info"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="rating-cocktails-container">
          <div className="rating-cocktail-card">
            <img
              alt=""
              className="rating-cocktail-img-ad"
              src="images/gov_logo.png"
            />
            <div className="rating-cocktail-info">
              <div className="content-text">
                <h3 className="rating-cocktail-name">Governance</h3>
                <ul className="des-list">
                  <li>Management Fairness</li>
                  <li>Diversity</li>
                  <li>Commitment</li>
                </ul>
                <span className="info"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="rating-cocktails-container">
          <div className="rating-cocktail-card">
            <img
              alt=""
              className="rating-cocktail-img-ad"
              src="images/esg_logo.png"
            />
            <div className="rating-cocktail-info">
              <div className="content-text">
                <h3 className="rating-cocktail-name">ESG</h3>
                <ul className="des-list">
                  <li>Total inclusive score</li>
                  <li>Overall of 3 pillars</li>
                </ul>
                <span className="info"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
