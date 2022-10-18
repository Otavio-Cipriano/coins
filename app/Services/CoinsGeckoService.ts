import AxiosBaseRequest from "./AxiosBaseRequest";


export default class CoinsGeckoService {
    public static async getCoin(coin: string){
        try {
            let coinResult = await AxiosBaseRequest.doRequest(`coins/${coin}`)
        
            return { success: true, data: coinResult}
            
        } catch (err) {

            return {success: false, data: 'Try Again Later'}

        }
    }

    public static async getCoinCurrency(coin: string, currency: string){
        try {
            let coinResult = await AxiosBaseRequest.doRequest('simple/price',{ ids: coin, vs_currencies: currency, include_last_updated_at: true})
            
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

    public static async getCoinsList(){
        try {
            let coinsList: any[] = await AxiosBaseRequest.doRequest('coins/list')

            return { success: true, data: coinsList }

        } catch (error) {

            return { success: false, data: [] }

        }
    }
};
