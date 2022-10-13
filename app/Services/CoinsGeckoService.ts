import AxiosBaseRequest from "./AxiosBaseRequest";

export default class CoinsService {
    public static async getCoin(coin: string){
        try {
            let coinResult = await AxiosBaseRequest.doRequest(`coins/${coin}`)
        
            return { success: true, data: coinResult.market_data}
            
        } catch (err) {

            return {success: false, data: 'Try Again Later'}

        }
    }

    public static async getCoinCurrency(currency: string){
        try {
            let coinResult = await AxiosBaseRequest.doRequest('simple/price',{ ids: 'bitcoin', vs_currencies: currency, include_last_updated_at: true})
            
            return { success: true, data: coinResult }
        
        } catch (error) {
           
            return { success: true, data: "Try Again later" }
        
        }
    }

    public static async getSupportedCurrencies(){
        try{
            let currenciesResult: Array<String> = await AxiosBaseRequest.doRequest('simple/supported_vs_currencies')

            return { success: true, data: currenciesResult }
        }
        catch(err){
            
            return {success: false, data: 'Try Again Later'}
        
        }
    }
};
