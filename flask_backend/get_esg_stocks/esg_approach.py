from . import get_esg_data, get_stocks_data

def return_esg_results(symbol):
    # fetching esg result from get_esg_data.py
    esg_result = get_esg_data.esg_data(symbol)

    # fetching stocks price result from get_sotcks_data.py
    stock_result = get_stocks_data.stocks_data(symbol)
    
    # parsing data back to server.py
    data = {
        "symbol": esg_result[0],
        "full_name": esg_result[1],
        "gics_sector": esg_result[2],
        "gics_sub_industry": esg_result[3],
        "environment_score": esg_result[4],
        "social_score": esg_result[5],
        "governance_score": esg_result[6],
        "total_esg": esg_result[7],
        "highest_controversy": esg_result[8],
        "percentile": esg_result[9],
        "market_cap": esg_result[10],
        "beta": esg_result[11],
        "overall_risk": esg_result[12],

        "stocks_symbol": stock_result[0],
        "stocks_start_date": stock_result[1],
        "stocks_end_date": stock_result[2],
        "stocks_upper_bound": stock_result[3],
        "stocks_lower_bound": stock_result[4],
        "stocks_date_list": stock_result[5],

        "prediction_upper_bound": stock_result[6],
        "prediction_lower_bound": stock_result[7],
    }

    return data