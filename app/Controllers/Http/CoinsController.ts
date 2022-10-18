import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ConvertCurrentPrices from "App/Helpers/ConvertCurrentPrice";
import ConvertTimeToFullDate from "App/Helpers/ConvertTimeToFullDate";
import GetObjKey from "App/Helpers/GetObjKey";
import CoinsGeckoService from "App/Services/CoinsGeckoService";

export default class CoinsController {
  public async index(ctx: HttpContextContract) {
    let params = ctx.request.params();
    let coin = !params["coin"] ? "bitcoin" : params["coin"].toLowerCase();

    let isSupportedCoin = await this.checkSupportedCoin(coin);

    if (!isSupportedCoin) return ctx.response.status(406).send({ error: "This Coins is not Supported" });

    let coinResult = await CoinsGeckoService.getCoin(coin);

    if (!coinResult.success) return ctx.response.status(400).send({ error: "Wait for a minute, before try again" });
    
    let responseBody = {
      coin: coinResult.data.id,
      current_price: [
        ...ConvertCurrentPrices(coinResult.data.market_data.current_price),
      ],
      last_updated: coinResult.data.market_data.last_updated,
    }

    return ctx.response.status(200).send(responseBody);
    
  }

  public async getCoinWithSpecificCurrency(ctx: HttpContextContract) {
    let params = ctx.request.params();
    let currency = !params["currency"] ? "usd" : params["currency"].toLowerCase();
    let coin = !params["coin"] ? "bitcoin" : params["coin"].toLowerCase();

    let isSupportedCoin = await this.checkSupportedCoin(coin);

    if (!isSupportedCoin) return ctx.response.status(406).send({ error: "This Coins is not Supported" });

    let isCurrencySupported = await this.checkSupportedCurrency(currency);

    if (!isCurrencySupported) return ctx.response.status(406).send({ message: "This currency is not supported" });

    let coinResult = await CoinsGeckoService.getCoinCurrency(coin, currency);

    if (!coinResult.success) return ctx.response.status(406).send({ message: "Ops something went wrong" });

    let priceObj = {};
    priceObj[currency] = coinResult.data[coin][currency];

    let responseBody = {
      coin: GetObjKey(coinResult.data, coin),
      current_price: priceObj,
      last_updated: ConvertTimeToFullDate(
        coinResult.data[coin].last_updated_at
      ),
    }

    return ctx.response.status(200).send(responseBody);
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
