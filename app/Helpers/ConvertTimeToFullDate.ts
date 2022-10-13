export default function ConvertTimeToFullDate(time: number){
    let currentDate = new Date()
    let updatedTime = new Date(time)
    let year = currentDate.getUTCFullYear()
    let month = String(currentDate.getUTCMonth() + 1).length < 2 ? '0'+String(currentDate.getUTCMonth() + 1) : String(currentDate.getUTCMonth() + 1)
    let day = String(currentDate.getUTCDate()).length < 2 ? '0'+String(currentDate.getUTCDate()) : String(currentDate.getUTCDate())
    let hour = updatedTime.getHours()
    let minutes = updatedTime.getMinutes()

    let ISODate = `${year}-${month}-${day}T0${hour}:${minutes}:00`
    
    return new Date(ISODate).toISOString()
}