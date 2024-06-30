import React, { useState, useEffect } from "react";
import "./css/ReportAnalyser.css";
import "./css/RatingPage.css";

const ReportAnalyser = () => {
  const [symbol, setSymbol] = useState("");
  const [fullName, setFullName] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [url, setURL] = useState("");
  const [jsonData, setJsonData] = useState({});
  const [data, setData] = useState({
    "Symbol": "",
    "Full Name": "",
    "Processed Date": "",
    "Report Published Year": "",
    "Categories": "",
    "Classes": "",
    "Distribution": "",
    "Execution Time": "",
  });

  const [fetchCompleted, setFetchCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.npoint.io/c7a2775b2df57c298384");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleYearChange = (event) => {
    setPublishYear(event.target.value);
  };

  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;

    return formattedToday;
  };

  const fetchData = () => {
    const symbolUpper = symbol.toUpperCase();

    if (symbolUpper in jsonData) {
      const reportData = jsonData[symbolUpper];
      if (reportData.publishYear === parseInt(publishYear)) {
        if (reportData.processedDate !== getTodayDate()) {
          const confirmMessage = `A report with the symbol '${symbolUpper}' and year '${publishYear}' has already been processed on date '${reportData.processedDate}'. Press OK to view the report or Cancel to generate a new one.`;

          if (window.confirm(confirmMessage)) {
            fetchReportData(symbolUpper);
          } else {
            // User chose not to continue
            generateData(symbolUpper, fullName, publishYear, url);
            return;
          }
        } else {
          fetchReportData(symbolUpper);
        }
      } else {
        generateData(symbolUpper, fullName, publishYear, url);
      }
    } else {
      generateData(symbolUpper, fullName, publishYear, url);
    }
  };

  const fetchReportData = (symbolUpper) => {
    const reportData = jsonData[symbolUpper];
    setData({
      "Symbol": reportData["tickerName"],
      "Full Name": reportData["longName"],
      "Processed Date": reportData["processedDate"],
      "Report Published Year": reportData["publishYear"],
      "Categories": reportData["categories"],
      "Classes": reportData["classes"],
      "Distribution": reportData["distribution"],
      "Execution Time": reportData["executionTime"],
    });
    setFetchCompleted(true);
  };

  const generateData = async (symbolUpper, fullName, publishYear, url) => {
    try {
      const res = await fetch(
        `http://localhost:5000/nlp_data/${symbolUpper}/${fullName}/${publishYear}?url=${url}`
      );
      const data = await res.json();
      setData({
        "Symbol": data["tickerName"],
        "Full Name": data["longName"],
        "Processed Date": data["processedDate"],
        "Report Published Year": data["publishYear"],
        "Categories": data["categories"],
        "Classes": data["classes"],
        "Distribution": data["distribution"],
        "Execution Time": data["executionTime"],
      });
      setFetchCompleted(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div className="banner-container">
        <div className="banner">
          <h2>Analyze any Sustainability Report</h2>
        </div>
      </div>

      <div className="input-form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Company Symbol"
            required
            size="50"
            value={symbol}
            onChange={handleSymbolChange}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Company Name"
            required
            size="50"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Enter Report Published Year"
            required
            size="50"
            value={publishYear}
            onChange={handleYearChange}
          />
        </div>
        <div className="input-container">
          <input
            type="url"
            placeholder="Enter PDF URL"
            required
            size="50"
            value={url}
            onChange={handleURLChange}
          />
        </div>
        <button onClick={fetchData}>Submit</button>
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
                        <i>Processed Date:</i> {data["Processed Date"]} [YYYY-MM-DD]
                      </td>
                      <td>
                        <i>Report Published Year:</i>{" "}
                        {data["Report Published Year"]}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h2 className="risk-score-ranking-title">ESG Management Scores:</h2>

                <div className="rating-page-container-tools">
                  <div className="rating-page-cocktails-container">
                    <div className="rating-page-cocktail-card">
                      <div className="rating-page-cocktail-info">
                        <div className="content-text">
                          <h3 className="rating-page-cocktail-name">
                            Environmental
                          </h3>
                          <img
                            alt=""
                            className="rating-page-cocktail-img-ad cont-img"
                            src="/images/env_logo.png"
                          />
                          <p>
                            {(
                              Object.values(data["Distribution"])[0] * 100
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rating-page-cocktails-container">
                    <div className="rating-page-cocktail-card">
                      <div className="rating-page-cocktail-info">
                        <div className="content-text">
                          <h3 className="rating-page-cocktail-name">
                            Social
                          </h3>
                          <img
                            alt=""
                            className="rating-page-cocktail-img-ad cont-img"
                            src="/images/soc_logo.png"
                          />
                          <p>
                            {(
                              Object.values(data["Distribution"])[1] * 100
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rating-page-cocktails-container">
                    <div className="rating-page-cocktail-card">
                      <div className="rating-page-cocktail-info">
                        <div className="content-text">
                          <h3 className="rating-page-cocktail-name">
                            Governance
                          </h3>
                          <img
                            alt=""
                            className="rating-page-cocktail-img-ad cont-img"
                            src="/images/gov_logo.png"
                          />
                          <p>
                            {(
                              Object.values(data["Distribution"])[2] * 100
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rating-page-cocktails-container">
                    <div className="rating-page-cocktail-card">
                      <div className="rating-page-cocktail-info">
                        <div className="content-text">
                          <h3 className="rating-page-cocktail-name">
                            Total ESG
                          </h3>
                          <img
                            alt=""
                            className="rating-page-cocktail-img-ad cont-img"
                            src="/images/esg_logo.png"
                          />
                          <p>
                            {(
                              ((Object.values(data["Distribution"])[0] +
                                Object.values(data["Distribution"])[1] +
                                Object.values(data["Distribution"])[2]) /
                                3) *
                              100
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="risk-score-ranking-title">
                  Class Distribution:
                </h2>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data["Classes"]).map(
                      ([category, value]) => (
                        <tr key={category}>
                          <td>
                            <i>{category}</i>
                          </td>
                          <td>{(value * 100).toFixed(2)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                <h2 className="risk-score-ranking-title">
                  Performance in Sustainable Investing Domains:
                </h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data["Categories"]).map(
                      ([category, value]) => (
                        <tr key={category}>
                          <td>
                            <i>{category}</i>
                          </td>
                          <td>{(value * 100).toFixed(2)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                <p className="disclaimer-text">
                  <em>Execution Time : {data["Execution Time"]}</em>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ReportAnalyser;
