import { prisma } from "@ioc:Adonis/Addons/Prisma";
import { Query } from "App/Models/Query";

export default class QueryHistoryRepository {
  public static async getQueryByCoin(coin: string) {
    let query = await prisma.queryHistory.findFirst({
      where: {
        coin: coin,
      },
      include: {
        currencies: {
          select: {
            name: true,
            value: true
          }
        }
      }
    });

    return query;
  }

  public static async createQuery(data: Query) {
    let newQuery = await prisma.queryHistory.create({
      data: {
        coin: data.coin,
        last_updated: data.last_updated,
        currencies: {
          create: data.currencies
        }
      }
    });

    return newQuery
  }
}
