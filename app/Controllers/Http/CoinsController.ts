import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConvertTimeToFullDate from 'App/Helpers/ConvertTimeToFullDate'
import CoinsService from 'App/Services/CoinsService'

export default class CoinsController {
    public async index(ctx: HttpContextContract){
        let coinResult = await CoinsService.getCoin()
        
        if(coinResult.success){
            return ctx.response.status(200).send({
                coin: "bitcoin",
                current_price: {
                    ...coinResult.data.current_price
                },
                last_updated: coinResult.data.last_updated
            })
        }

        return ctx.response.status(400).send({error: 'Wait for a minute, before try again'})
    }

    public async getCoinCurrency(ctx: HttpContextContract){
        let currency = ctx.request.params()['currency']
        let isCurrencySupported = await this.checkSupportedCurrency(currency)

        if(isCurrencySupported){
            let coinResult = await CoinsService.getCoinCurrency(currency)
            
            if(coinResult.success) 
            return ctx.response.status(200).send({
                coin: "bitcoin",
                current_price: coinResult.data["bitcoin"][currency],
                last_updated: ConvertTimeToFullDate(coinResult.data["bitcoin"].last_updated_at)
            })
        }

        return ctx.response.status(400).send({
            message: "This currency is not supported"
        })
        
    }

    private async checkSupportedCurrency(currency: string){
        let supportedCurrencies = await CoinsService.getSupportedCurrencies()

        if(supportedCurrencies.success){
            return supportedCurrencies.data.includes(currency)
        }

        return false
    }
}
