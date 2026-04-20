// This script fetches data from Open Data Bristol (ODB)

console.log("OpenDataBristol Script has started...")
let filterFromURL = new URLSearchParams(location.search);
let mode = filterFromURL.get("Mode");
let sev = (filterFromURL.get("severity"));
let urlEncoded = encodeURI(sev)
let modeString = ""
let sevString = ""
//where= (SEVERITY %3D 2 OR SEVERITY %3D 3)

if ((mode == "0" && sev == "0") || (mode == null && sev == null)) {
    urlEncoded = "1%3D1"
} else {

    if (mode == "CARS" || mode == "CYC" || mode == "MCYC") {
        console.log(mode)
        modeString = "RENDER = '" + mode + "' "
    } else {
        modeString = "(RENDER = 'C'  OR RENDER = 'A' OR RENDER = 'E') ";
    }

    sevString = "SEVERITY_DESCRIPTION = '" + sev + "'";

    if ((sev != 0 && mode != 0)) {
        UrlUnencoded = ("(" + modeString + " AND " + sevString + ")");
    } else {
        if (sev == null || sev == 0) {
            UrlUnencoded = modeString;
        } else {
            UrlUnencoded = sevString;
        }
    }

    console.log("mstring: " + modeString);
    urlEncoded = encodeURI(UrlUnencoded);
    console.log(UrlUnencoded);
    console.log(urlEncoded);
}

let url = `https://maps2.bristol.gov.uk/server2/rest/services/ext/ll_transport/MapServer/41/query?where=${urlEncoded}&outFields=DATE_,TIME,SEVERITY,ACCIDENT_TYPE,ACCIDENT_DESCRIPTION,RENDER,DATE_TIME_CONVERTED,SEVERITY_DESCRIPTION,CASUALTIES&outSR=4326&f=geojson`
fetch(url, {method: 'GET', headers: {"Accept": "application/json"}})
    .then(response => response.json())
    .then((json) => OdbToMap(json))

console.log(url);


    

console.log("ODB Script Successful!");