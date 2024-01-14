export function Addrowerror(mandkeys, jsondata, arrData) {
    var mandarr = Object.keys(jsondata)

    var errarr = []

    mandarr.forEach((ele) => {
        if (typeof (jsondata[ele]) === "object" && mandkeys.indexOf(ele) >= 0 && jsondata[ele]?.length === 0) {
            errarr.push(ele)
        }
        else if (mandkeys.indexOf(ele) >= 0 && !jsondata[ele]) {

            errarr.push(ele)
        }
    })
    return errarr
}