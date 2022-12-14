<h1 align="center">Coins</h1>
<p align="center">
  <img src="https://img.shields.io/github/issues/Otavio-Cipriano/coins" alt="Badge Github Issues"/>
  <img src="https://img.shields.io/github/forks/Otavio-Cipriano/coins" alt="Badge Github Forks"/>
  <img src="https://img.shields.io/github/stars/Otavio-Cipriano/coins" alt="Badge Github Stars"/>
  <img src="https://img.shields.io/github/license/Otavio-Cipriano/coins" alt="Badge Github License"/>
</p>

A API developed using AdonisJs and the data provided by the API [CoinGecko](https://www.coingecko.com/en/api/documentation)

## Index

* [Index](#Index)
* [API](#Api)
* [Endpoints](#Endpoints)

## API

Use this root URL to make API requests: https://coins-integration-api.onrender.com

## Endpoints

## /Bitcoin

Methods allowed by the endpoint
| Method | Description |
| --- | --- |
| `GET` | return currencies from Bitcoin |

Returns all currencies from bitcoin supported by CoinGecko and last time updated

* Response 200 (application/json)

      {
        "coin": "Bitcoin",
        "current_price": [currencies],
        "last_updated": '2022-10-13T07:12:41.520Z'
      }


## /Bitcoin/:Currency
Methods allowed by the endpoint
| Method | Description |
| --- | --- |
| `GET` | returns a info about a specific currency from Bitcoin |

Returns only a specific currency from bitcoin supported by CoinGecko and last time updated

* Response 200 (application/json)

      {
        "coin": "Bitcoin",
        "current_price": {
          "brl": "101023"
        },
        "last_updated": '2022-10-13T07:12:41.520Z'
      }
