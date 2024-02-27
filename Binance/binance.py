import ccxt
import requests
from requests_toolbelt.adapters import source
import socket
import pandas as pd
import talib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import numpy as np

def get_ipv4_session():
    local_ipv4 = socket.gethostbyname(socket.gethostname())
    src = source.SourceAddressAdapter(local_ipv4)

    session = requests.Session()
    session.mount("https://", src)

    return session

exchange = ccxt.binanceus({  # Replace 'binance' with your chosen exchange
    'apiKey': '',
    'secret': '',
    'session': get_ipv4_session()
})

# Fetch historical price data
ohlcv_data = exchange.fetch_ohlcv('BTC/USDT', timeframe='1d', limit=1000)

# Create a pandas DataFrame
df = pd.DataFrame(ohlcv_data, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms') 
df.set_index('timestamp', inplace=True)

df['RSI'] = talib.RSI(df['close'], timeperiod=14)
df['SMA_20'] = talib.SMA(df['close'], timeperiod=20)
# Add more indicators: Bollinger Bands, MACD, etc. 

features = ['RSI', 'SMA_20']  # Adjust based on selected features
target = np.where(df['close'].shift(-1) > df['close'], 1, 0)  # 1 for buy, 0 for sell

X_train, X_test, y_train, y_test = train_test_split(df[features], target, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)

# Generate trading signals
predictions = model.predict(X_test)

# Place market buy or sell of 1 BTC/USDT
if predictions[-1] == 1:
    exchange.create_market_buy_order('BTC/USDT', 1) 
elif predictions[-1] == 0:
    exchange.create_market_sell_order('BTC/USDT', 1)