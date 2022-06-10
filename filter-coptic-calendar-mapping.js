const filter_gregorian_year = 2019;
const filter_gregorian_month = 9;
const filter_gregorian_day = 12;

mapping = require("./coptic-calendar-mapping.json");

//JavaScript counts months from 0 to 11
//JavaScript's Date object tracks time in UTC internally

timezoneDate = new Date();
const timezone = timezoneDate.getTimezoneOffset()*-1;

const filter_gregorian_date = new Date(filter_gregorian_year,filter_gregorian_month-1,filter_gregorian_day, 0, timezone);

if(filter_gregorian_year%4 == 0){
    gregorian_year_type = 'leap';
    coptic_first_day = 11;
}
else if ((filter_gregorian_year+1)%4 == 0){
    gregorian_year_type = 'pre-leap';
    coptic_first_day = 12;
}
else {
    gregorian_year_type = 'normal';
    coptic_first_day = 11;
}

result = mapping.coptic_calendar_mapping.filter(n => {
    return n.type === gregorian_year_type && n.gregorian_month === filter_gregorian_month && n.gregorian_day === filter_gregorian_day
});

const coptic_first_day_date = new Date(filter_gregorian_year,8,coptic_first_day, 0, timezone);

if(coptic_first_day_date <= filter_gregorian_date){
    coptic_year = filter_gregorian_year - 283;
}
else {
    coptic_year = filter_gregorian_year - 284;
}

console.log("gregorian date: " + filter_gregorian_year + "-" + filter_gregorian_month + "-" + filter_gregorian_day);
console.log("coptic first day: " + filter_gregorian_year +"-9-" + coptic_first_day);
//console.log("result count " + result.length);
result.forEach(n => {
    console.log("coptic date: " + coptic_year + "-" + n.coptic_month + "-" + n.coptic_day)
});

console.log("raw data");
console.log(result);
