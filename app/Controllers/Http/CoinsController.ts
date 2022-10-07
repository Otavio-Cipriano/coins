import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CoinsController {
    public async index(ctx: HttpContextContract){
        return ctx.params['bitcoin']
    }
}
