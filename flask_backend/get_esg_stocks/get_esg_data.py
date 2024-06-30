# Yahoo Query Library
import yahooquery as yq

def esg_data(symbol):

    # Getting YahooQuery modules
    get_yq_list = yq.Ticker(symbol)
    modules = 'assetProfile esgScores summaryDetail quoteType'
    req_yq = get_yq_list.get_modules(modules)[symbol]
    
    # sending data back to esg_approach.py
    data = [
        symbol,
        req_yq['quoteType']['longName'],
        req_yq['assetProfile']['sector'],
        req_yq['esgScores']['peerGroup'],
        req_yq['esgScores']["environmentScore"],
        req_yq['esgScores']["socialScore"],
        req_yq['esgScores']["governanceScore"],
        req_yq['esgScores']["totalEsg"],
        req_yq['esgScores']["highestControversy"],
        req_yq['esgScores']["percentile"],
        req_yq['summaryDetail']['marketCap'],
        req_yq['summaryDetail']["beta"],
        req_yq['assetProfile']["overallRisk"]
    ]
    
    return data