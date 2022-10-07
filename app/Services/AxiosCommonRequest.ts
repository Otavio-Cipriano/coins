import axios from 'axios'

export default class AxiosCommonRequest {
    private static api = axios.create({baseURL: 'https://api.coingecko.com/api/v3/'})

    public static async doRequest(url: string){
        return this.api.get(url)
        .then(res => {
            return res.data
        }).catch(err =>{
            return err.response.data
        })
    }
};
