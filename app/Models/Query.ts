import { Currency } from "./Currency";

export declare interface Query{
    coin: string,
    currencies: Currency[]
    last_updated: string
}