export default function ConvertCurrentPrices(currentPrices){
    let keys = Object.keys(currentPrices)
    return keys.map((key) => {
        return { name: key, value: currentPrices[key] }
    })
}