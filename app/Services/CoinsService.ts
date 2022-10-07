import AxiosCommonRequest from "./AxiosCommonRequest";

export default class CoinsService {
    public static async getCoin(){
        try {
            let coinResult = await AxiosCommonRequest.doRequest('coins/bitcoin')
        
            return { success: true, data: coinResult.market_data}
            
        } catch (err) {

            return {success: false, data: 'Try Again Later'}

        }
    }
};
