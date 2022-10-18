import { Query } from "App/Models/Query";
import QueryRepository from "App/Repositories/QueryRepository";

export default class QueryService {
  public static async getQueryByCoin(coin: string) {
    try {
      let query = await QueryRepository.getQueryByCoin(coin);
      return query;
    } catch (error) {
      console.log(error);
    }
  }

  public static async createQuery(data: Query) {
    try {
      let queryExist = await this.getQueryByCoin(data.coin);

      if (queryExist) return { success: false, data: null };
      
      let createdQuery = await QueryRepository.createQuery(data);

      if (createdQuery) return { success: true, data: createdQuery };
    } catch (error) {
      console.log(error);
      return { success: false, data: null };
    }
  }
}
