// This script ...

const param = new URLSearchParams(location.search)
var date;
let slider = document.getElementById("timeslider");
let label = document.getElementById("timelabel");

console.log("Date Get Script has started...")
let timetable = "https://maps2.bristol.gov.uk/server2/rest/services/ext/ll_transport/MapServer/41/query?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=DATE_&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=DATE_&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
fetch(timetable, { method: 'GET', headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(minmax);
console.log("Date Get Script Successful!");

function minmax(json) {
    let f = json.features;
    let min = f[0].attributes.DATE_;
    let max = f[f.length-1].attributes.DATE_;
    slider.min = min;
    slider.max = max;
}

function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    return time;
} // sourced from kamal shooryabi, https://stackoverflow.com/a/50964498

slider.addEventListener("change", () => {
    label.textContent = slider.value
    date = slider.value;
    convertTimestamp(date)
    console.log(date)
})