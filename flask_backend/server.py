from flask import Flask, jsonify, request
from flask_cors import CORS

# Importing files from ESG Stocks folder
from get_esg_stocks import esg_approach

# Importing files from NLP PDF folder
from get_nlp_pdf import nlp_approach

app = Flask(__name__)

# app.config.from_object('config')
CORS(app)

# CORS Headers 
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route("/esg_data")
def esg_data():
    # Getting symbol
    symbol = request.args.get("symbol")
    
    data = esg_approach.return_esg_results(symbol)
    
    return jsonify(data)

@app.route("/nlp_data/<string:company_symbol>/<string:full_name>/<int:report_year>")
def nlp_data(company_symbol, full_name, report_year):
    pdf_url = request.args.get("url")

    # Call your nlp_parser function with the parameters
    nlp_result = nlp_approach.nlp_parser(company_symbol, full_name, report_year, pdf_url)

    return jsonify(nlp_result)

if __name__ == "__main__":
    app.run(debug=True)


# Run python server.py

# http://localhost:5000/esg_data?symbol=${symbol}

# http://localhost:5000/nlp_data?url=https://www.responsibilityreports.com/Click/2534

# http://localhost:5000/nlp_data/MCD/McDonalds/2021?url=https://www.responsibilityreports.com/Click/2534