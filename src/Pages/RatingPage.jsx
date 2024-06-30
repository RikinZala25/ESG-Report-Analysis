import React from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import esgData from "./assets/s&p500_esg_data.json";
import priceData from "./assets/s&p500_price_data.json";

import RatingLineChart from "./RatingLineChart";

import "./css/RatingPage.css";

function RatingPage() {
  const { symbol } = useParams();
  const symbolESGData = esgData[symbol];
  const symbolPriceData = priceData[symbol];
  const navigate = useNavigate();

  if (!symbolESGData) {
    return <div>Symbol not found</div>;
  }

  return (
    <div className="rating-page-container">
      <div className="rating-page-banner-container">
        <div className="rating-page-banner">
          <div className="constitiuent-name">
            <h4>
            <img alt="" className="rating-cocktail-img" src="/images/leaf.png" />
              <i>Constituent Name:</i> '{symbolESGData["Full Name"]}'
              <img alt="" className="rating-cocktail-img" src="/images/leaf.png" />
            </h4>
          </div>

          <table className="constituent-table">
            <tbody>
              <tr>
                <td>
                  <i>Symbol:</i> {symbolESGData["Symbol"]}
                </td>
                <td>
                  <i>GICS Sector:</i> {symbolESGData["GICS Sector"]}
                </td>
                <td>
                  <i>GICS Sub-Industry:</i> {symbolESGData["GICS Sub-Industry"]}
                </td>
              </tr>
              <tr>
                <td>
                  <i>Highest Controversy:</i>{" "}
                  {symbolESGData["Highest Controversy"]}
                </td>
                <td>
                  <i>Percentile:</i> {symbolESGData["Percentile"]}
                </td>
                <td>
                  <i>Market Cap:</i> {symbolESGData["Market Cap"]} $
                </td>
              </tr>
              <tr>
                <td>
                  <i>1-Year Beta:</i> {symbolESGData["Beta"]}
                </td>
                <td>
                  <i>Overall Risk:</i> {symbolESGData["Overall Risk"]}
                </td>
                <td>
                  <i>As of:</i> September 2023
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="risk-score-ranking-title">Risk Score Rankings:</h2>

          <div className="rating-page-container-tools">
            <div className="rating-page-cocktails-container">
              <div className="rating-page-cocktail-card">
                <div className="rating-page-cocktail-info">
                  <div className="content-text">
                    <h3 className="rating-page-cocktail-name">
                      Environmental Risk
                    </h3>
                    <img
                      alt=""
                      className="rating-page-cocktail-img-ad cont-img"
                      src="/images/env_logo.png"
                    />
                    <p>{symbolESGData["Environment Score"]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rating-page-cocktails-container">
              <div className="rating-page-cocktail-card">
                <div className="rating-page-cocktail-info">
                  <div className="content-text">
                    <h3 className="rating-page-cocktail-name">Social Risk</h3>
                    <img
                      alt=""
                      className="rating-page-cocktail-img-ad cont-img"
                      src="/images/soc_logo.png"
                    />
                    <p>{symbolESGData["Social Score"]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rating-page-cocktails-container">
              <div className="rating-page-cocktail-card">
                <div className="rating-page-cocktail-info">
                  <div className="content-text">
                    <h3 className="rating-page-cocktail-name">
                      Governance Risk
                    </h3>
                    <img
                      alt=""
                      className="rating-page-cocktail-img-ad cont-img"
                      src="/images/gov_logo.png"
                    />
                    <p>{symbolESGData["Governance Score"]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rating-page-cocktails-container">
              <div className="rating-page-cocktail-card">
                <div className="rating-page-cocktail-info">
                  <div className="content-text">
                    <h3 className="rating-page-cocktail-name">
                      Total ESG Risk
                    </h3>
                    <img
                      alt=""
                      className="rating-page-cocktail-img-ad cont-img"
                      src="/images/esg_logo.png"
                    />
                    <p>{symbolESGData["Total Esg"]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="note-text">
            <em>
              Note : The lower the rate of risks, the better the stats of
              company
            </em>
          </p>
          <button className="btn goBackBtn" onClick={() => navigate(-1)}>
            Other Ratings
          </button>
        </div>
      </div>

      <div className="rating-page-banner-container">
        <div className="rating-page-banner">
          <div className="constitiuent-name">
            <h4>
              <i>Stock Pricing for:</i> '{symbolESGData["Full Name"]}'
            </h4>
          </div>
          <RatingLineChart symbolPriceData={symbolPriceData} symbol={symbol} />
        </div>
      </div>
    </div>
  );
}

export default RatingPage;
