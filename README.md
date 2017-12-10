# Cracking the Bitcoin Code

Cracking the Bitcoin Code is an interactive site that uses data visualizations to provide a brief description of how Bitcoin works and how it came to be. 

## Accessing the Site

The site is currently live at www.bitguide.live 

It has been optimized for Chrome

Our screencast can be accessed at https://www.youtube.com/watch?v=wvckwdMqjzU

## Breakdown 

### Index.html

This file contains the entire layout. The site is one scrolling page with various bootstrap grids and visualizations. 

### Main.js

In this file, the text is typed in using the Typed.js library. Additionally, various visualizations are initialized including the following: 

#### priceChart.js

Creates a Chart for the Bitcoin price. 

#### vendorMap.js

Uses [Leaflet.js](http://leafletjs.com/) to create a map with various vendors of bitcoing using the [CoinMap](https://coinmap.org/api/) Api. 

#### marketCap.js

Uses [Coin Market Cap](https://coinmarketcap.com/) to create a stacked area chart of the six cryptocurrencies with the highest market caps. 

#### timeline.js

Creates the brushed timeline to filter dates for the stacked area chart of market caps. 

#### forkTree.js

Creates a Tree using data of Bitcoin Forks. Uses nodes.descendants() to format the tree-like structure of the data. 

### Other Visualizations

#### mining.js

Iterates through various "hashes" to create a scrolling text effect. When scrolling is finished an error message appears. One of out two hundred times a success message will appear. 

## Data

* [Bitcoin Price Data](https://www.kaggle.com/mczielinski/bitcoin-historical-data)
* [Bitcoin Price Data](https://www.kaggle.com/sudalairajkumar/cryptocurrencypricehistory)
* [History of Bitcoin](http://www.nytimes.com/interactive/technology/bitcoin-timeline.html#/#time284_8155)
* [Companies that accept bitcoin and their locations data](https://99bitcoins.com/who-accepts-bitcoins-payment-companies-stores-take-bitcoins/) 
* [Data on Bitcoin Mining](https://www.bitcoinmining.com/) 
* [Bitcoin Price Data](https://blockchain.info/charts/market-price)
* [CoinMap API](https://coinmap.org/api/)
* [Coin Market Cap](https://coinmarketcap.com/)

## Built With

* [D3 v4](https://d3js.org/) - Javascript library used for visualizations
* [Typed.js](https://github.com/mattboldt/typed.js/) - Text Animations
* [Leaflet.js](http://leafletjs.com/) - Map visualizations
* [Bootstrap](https://getbootstrap.com/) - Used for formatting
* [NoUiSlider.js](https://refreshless.com/nouislider/) - Creates slider visualizations
* [Scroll-Entrance.js](https://andycaygill.github.io/scroll-entrance/) - Fades in views
* [Queue.v1.min.js](https://github.com/d3/d3-queue) - Queues data

## Authors

* **Amelia Miller** 
* **Luke Civantos**
* **Charlie Flood** 

## License

This work is licensed under a Creative Commons Attribution 4.0 International License.

## Acknowledgments

* Thanks to Nathan Lee for overseeing this project.
* Thanks to Zona Kostic for guiding us through D3. 
