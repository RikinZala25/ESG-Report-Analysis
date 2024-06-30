import numpy as np
import pandas as pd
import datetime

# Yahoo Finance Library
import yfinance as yf

# Machine Learning for Predictions Libraries
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# generating predictions for next day
def get_predictions(data):

    data['High_Lagged'] = data['High'].shift(1)
    data['Low_Lagged'] = data['Low'].shift(1)

    data = data.fillna(0)

    # Split the data into training and testing sets
    train_size = int(0.8 * len(data))
    train_data, test_data = data[:train_size], data[train_size:]

    # Define features and target
    X_train, y_train = train_data[['High_Lagged', 'Low_Lagged']], train_data[['High', 'Low']]
    X_test, y_test = test_data[['High_Lagged', 'Low_Lagged']], test_data[['High', 'Low']]

    # Initialize and train a linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Make predictions for the next day
    predictions = model.predict(X_test)
    median_predictions = np.median(predictions, axis=0)

    return median_predictions

# generating overall stocks data
def stocks_data(symbol):

    # Getting current date
    current_date = datetime.datetime.now()

    # initialize the start and end date; Start date -> Last Month's 1st date; End date -> Yesterday's date
    start_date = f"{current_date.year}-{current_date.month - 1}-1"
    end_date = f"{current_date.year}-{current_date.month}-{current_date.day - 1}"

    # find the stock data

    # yf.download() -- depricated
    # stock_data = yf.download(symbol, start_date, end_date, auto_adjust=True)

    # Alternative approach - yf.Ticker().history()
    stock_data = yf.Ticker(symbol).history(start=start_date, end=end_date, auto_adjust=True)

    # get high and low rate of stocks for chart
    upperBound = stock_data['High'].to_list()
    lowerBound = stock_data['Low'].to_list()

    # get date for stocks for chart
    date_index = stock_data.index.date
    date_strings = np.array([date.strftime('%Y-%m-%d') for date in date_index])
    
    # convert it to list
    dateList = date_strings.tolist()

    # getting value of prediction for next day
    pred_value = get_predictions(stock_data)
    
    # sending data back to esg_approach.py
    data = [
        symbol,
        start_date,
        end_date,
        upperBound,
        lowerBound,
        dateList,
        pred_value[0],
        pred_value[1]
    ]

    return data