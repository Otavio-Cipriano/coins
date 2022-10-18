import { prisma } from "@ioc:Adonis/Addons/Prisma";
import { Query } from "App/Models/Query";

export default class QueryRepository {
  public static async getQueryByCoin(coin: string) {
    let query = await prisma.query.findFirst({
      where: {
        coin: coin
      }
    });

    return query;
  }

  public static async createQuery(data: Query) {
    let newQuery = await prisma.query.create({
      data: {
        coin: data.coin,
        currencies: {
          create: data.currencies
        }
      }
    });

    return newQuery
  }
}
