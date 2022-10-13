import axios from 'axios'

export default class AxiosBaseRequest {
    private static api = axios.create({baseURL: 'https://api.coingecko.com/api/v3/'})

    public static async doRequest(url: string, params?: object){
        return this.api.get(url, { params: params})
        .then(res => {
            return res.data
        }).catch(err =>{
            return err.response.data
        })
    }
};
