import React, { useState } from "react";
import AllocationLineChart from "./AllocationLineChart";
import "./css/Allocation.css";
import "./css/RatingPage.css";

const Allocation = () => {
  const [symbol, setSymbol] = useState("");

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const [data, setdata] = useState({
    "Symbol": "",
    "Full Name": "",
    "GICS Sector": "",
    "GICS Sub-Industry": "",
    "Environment Score": 0,
    "Social Score": 0,
    "Governance Score": 0,
    "Total Esg": 0,
    "Highest Controversy": "",
    "Percentile": "",
    "Market Cap": "",
    "Beta": 0,
    "Overall Risk": 0,

    "Stock Symbol": "",
    "Stock Start Date": "",
    "Stock End Date": "",
    "Stock Upper Bound": "",
    "Stock Lower Bound": "",
    "Stock Date List": "",

    "Prediction Upper Bound": 0,
    "Prediction Lower Bound": 0,
  });

  const [fetchCompleted, setFetchCompleted] = useState(false);

  const fetchData = () => {
    fetch(`http://localhost:5000/esg_data?symbol=${symbol}`).then((res) =>
      res
        .json()
        .then((data) => {
          setdata({
            "Symbol": data["symbol"],
            "Full Name": data["full_name"],
            "GICS Sector": data["gics_sector"],
            "GICS Sub-Industry": data["gics_sub_industry"],
            "Environment Score": data["environment_score"],
            "Social Score": data["social_score"],
            "Governance Score": data["governance_score"],
            "Total Esg": data["total_esg"],
            "Highest Controversy": data["highest_controversy"],
            "Percentile": data["percentile"],
            "Market Cap": data["market_cap"],
            "Beta": data["beta"],
            "Overall Risk": data["overall_risk"],

            "Stock Symbol": data["stocks_symbol"],
            "Stock Start Date": data["stocks_start_date"],
            "Stock End Date": data["stocks_end_date"],
            "Stock Upper Bound": data["stocks_upper_bound"],
            "Stock Lower Bound": data["stocks_lower_bound"],
            "Stock Date List": data["stocks_date_list"],

            "Prediction Upper Bound": data["prediction_upper_bound"],
            "Prediction Lower Bound": data["prediction_lower_bound"],
          });
          setFetchCompleted(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
    );
  };

  return (
    <div className="rating-container App">
      <header className="App-header">
        <div className="rating-banner-container">
        <div className="rating-banner">
          <h2>Allocate any Company's Capital</h2>
        </div>
      </div>

      <div className="rating-banner-container">
        <input
          type="text"
          placeholder="Enter Symbol (e.g., AAPL)"
          required
          value={symbol}
          onChange={handleSymbolChange}
        />
        <button onClick={fetchData} className="btn">Check</button>
      </div>

        {fetchCompleted ? (
          <>
            <div className="rating-page-container">
              <div className="rating-page-banner-container">
                <div className="rating-page-banner">
                  <div className="constitiuent-name">
                    <h4>
                      <img
                        alt=""
                        className="rating-cocktail-img"
                        src="/images/leaf.png"
                      />
                      <i>Constituent Name:</i> '{data["Full Name"]}'
                      <img
                        alt=""
                        className="rating-cocktail-img"
                        src="/images/leaf.png"
                      />
                    </h4>
                  </div>

                  <table className="constituent-table">
                    <tbody>
                      <tr>
                        <td>
                          <i>Symbol:</i> {data["Symbol"]}
                        </td>
                        <td>
                          <i>GICS Sector:</i> {data["GICS Sector"]}
                        </td>
                        <td>
                          <i>GICS Sub-Industry:</i> {data["GICS Sub-Industry"]}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i>Highest Controversy:</i>{" "}
                          {data["Highest Controversy"]}
                        </td>
                        <td>
                          <i>Percentile:</i> {data["Percentile"]}
                        </td>
                        <td>
                          <i>Market Cap:</i> {data["Market Cap"]} $
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i>1-Year Beta:</i> {data["Beta"]}
                        </td>
                        <td>
                          <i>Overall Risk:</i> {data["Overall Risk"]}
                        </td>
                        <td>
                          <i>As of:</i> September 2023
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 className="risk-score-ranking-title">
                    Risk Score Rankings:
                  </h2>

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
                            <p>{data["Environment Score"]}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rating-page-cocktails-container">
                      <div className="rating-page-cocktail-card">
                        <div className="rating-page-cocktail-info">
                          <div className="content-text">
                            <h3 className="rating-page-cocktail-name">
                              Social Risk
                            </h3>
                            <img
                              alt=""
                              className="rating-page-cocktail-img-ad cont-img"
                              src="/images/soc_logo.png"
                            />
                            <p>{data["Social Score"]}</p>
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
                            <p>{data["Governance Score"]}</p>
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
                            <p>{data["Total Esg"]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="note-text">
                    <em>
                      Note : The lower the rate of risks, the better the stats
                      of company
                    </em>
                  </p>
                </div>
              </div>

              <div className="rating-page-banner-container">
                <div className="rating-page-banner">
                  <div className="constitiuent-name">
                    <h4>
                      <i>Stock Pricing for:</i> '{data["Stock Symbol"]}'
                    </h4>
                  </div>
                  <table className="stocks-table">
                    <tbody>
                      <tr>
                        <td>
                          <i>Start Date:</i> {data["Stock Start Date"]}
                        </td>
                        <td>
                          <i>End Date:</i> {data["Stock End Date"]}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <AllocationLineChart
                    symbol={symbol}
                    lower_bound={data["Stock Lower Bound"]}
                    upper_bound={data["Stock Upper Bound"]}
                    date_list={data["Stock Date List"]}
                  />

                  <h4 className="final_predictions">
                    <i>Stock Predictions</i>
                  </h4>

                  <table className="stocks-table">
                    <tbody>
                      <tr>
                        <td>
                          <i>Upper Bound:</i> {data["Prediction Upper Bound"]}
                        </td>
                        <td>
                          <i>Lower Bound:</i> {data["Prediction Lower Bound"]}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="disclaimer-text">
                    <em>
                      <strong>Disclaimer :</strong> Information provided is for informational
                      purposes only. It does not constitute financial advice or
                      a recommendation to trade stocks.
                    </em>
                    <br />
                    <em>
                      Investing involves risks, and individuals should consult
                      with a financial advisor before making investment
                      decisions.
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </header>
    </div>
  );
};

export default Allocation;
