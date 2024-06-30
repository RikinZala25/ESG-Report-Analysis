import yfinance as yf
from datetime import datetime

def getData(ticker, long_name, publish_year, category_distribution, class_distribution, output_list, execution_time):
  
  # getting current time
  get_current_date = datetime.now().strftime('%Y-%m-%d')

  # getting longName from yahoofinance
  try:
    get_long_name = yf.Ticker(ticker).info.get("longName")

    if get_long_name is None:
      raise ValueError("Long name not found in Yahoo Finance.")
  
  except Exception as e:
    get_long_name = long_name

  # processing category_distribution
  output_list_amplified = {key.replace('_', ' ').replace('And', 'and').replace('Of', 'of'): value for key, value in output_list.items()}

  append_data = {
        'tickerName': ticker,
        'longName': get_long_name,
        'publishYear': publish_year,
        'processedDate': get_current_date,
        'categories': output_list_amplified,
        'classes': category_distribution,
        'distribution': class_distribution,
        'executionTime': execution_time,
    }

  print('Data Prepared')
  
  return append_data