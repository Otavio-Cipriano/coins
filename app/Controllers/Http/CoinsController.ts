import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ConvertCurrentPrices from "App/Helpers/ConvertCurrentPrice";
import { Query } from "App/Models/Query";
import CoinsGeckoService from "App/Services/CoinsGeckoService";
import QueryHistoryService from "App/Services/QueryHistoryService";

export default class CoinsController {
  public async index(ctx: HttpContextContract) {
    let params = ctx.request.params();
    let coin = String(params["coin"] ?? "bitcoin").toLowerCase();

    let isSupportedCoin = await this.checkSupportedCoin(coin);

    if (!isSupportedCoin)
      return ctx.response
        .status(406)
        .send({ error: "This Coins is not Supported" });

    let oldQuery = await this.checkQueryExists(coin);

    if (oldQuery)
      return ctx.response.status(200).send({
        coin: oldQuery.coin,
        current_price: oldQuery.currencies,
        last_updated: oldQuery.last_updated,
      });

    let coinResult = await CoinsGeckoService.getCoin(coin);

    if (!coinResult.success)
      return ctx.response
        .status(400)
        .send({ error: "Wait for a minute, before try again" });

    let query: Query = {
      coin: coinResult.data.id,
      currencies: ConvertCurrentPrices(
        coinResult.data.market_data.current_price
      ),
      last_updated: coinResult.data.market_data.last_updated,
    };

    let queryHistory = await QueryHistoryService.createQuery(query);

    console.log(queryHistory);

    return ctx.response.status(200).send(query);
  }

  public async getCoinWithSpecificCurrency(ctx: HttpContextContract) {
    let params = ctx.request.params();
    let currency = String(params["currency"] ?? "usd").toLowerCase();
    let coin = String(params["coin"] ?? "bitcoin").toLowerCase();

    let isSupportedCoin = await this.checkSupportedCoin(coin);

    if (!isSupportedCoin)
      return ctx.response
        .status(406)
        .send({ error: "This Coins is not Supported" });

    let isCurrencySupported = await this.checkSupportedCurrency(currency);

    if (!isCurrencySupported)
      return ctx.response
        .status(406)
        .send({ message: "This currency is not supported" });

    let oldQuery = await this.checkQueryExists(coin);

    if (oldQuery)
      return ctx.response.status(200).send({
        coin: oldQuery.coin,
        current_price: oldQuery.currencies.filter((el) => el.name === currency),
        last_updated: oldQuery.last_updated,
      });

    let coinResult = await CoinsGeckoService.getCoin(coin);

    if (!coinResult.success)
      return ctx.response
        .status(406)
        .send({ message: "Ops something went wrong" });

    let query: Query = {
      coin: coinResult.data.id,
      currencies: ConvertCurrentPrices(
        coinResult.data.market_data.current_price
      ),
      last_updated: coinResult.data.market_data.last_updated,
    };

    let queryHistory = await QueryHistoryService.createQuery(query);
    console.log(queryHistory);

    return ctx.response.status(200).send({
      coin: query.coin,
      current_price: ConvertCurrentPrices(
        coinResult.data.market_data.current_price
      ).filter((el) => el.name === currency),
      last_updated: coinResult.data.market_data.last_updated,
    });
  }

  private async checkQueryExists(coin: string) {
    let query = await QueryHistoryService.getQueryByCoin(coin);

    if (query) return query;
    else return null;
  }

  private async checkSupportedCoin(coin: string) {
    let coinsList = await CoinsGeckoService.getCoinsList();

    if (!coinsList.success) return false;

    let supportedCoin = coinsList.data.find((e) => {
      return e.id == coin;
    });

    if (supportedCoin) return true;

    return false;
  }

  private async checkSupportedCurrency(currency: string) {
    let supportedCurrencies = await CoinsGeckoService.getSupportedCurrencies();

    if (supportedCurrencies.success) {
      return supportedCurrencies.data.includes(currency);
    }

    return false;
  }
}
