var moment = require('moment');

function isItWorkingTime(date) {
    var now = moment(date);
    var dayBegin = now.clone().hour(7).minute(0);
    var dayEnd = now.clone().hour(19).minute(0);
    var isoWeekdaySaturday = 6;
    var isoWeekdaySunday = 7;

    if (now.isBefore(dayBegin) ||
        now.isAfter(dayEnd) ||
        now.isoWeekday() === isoWeekdaySaturday ||
        now.isoWeekday() === isoWeekdaySunday) {
        return false;
    }

    return true;
}

module.exports = {
    isItWorkingTime: isItWorkingTime
}