import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
}
