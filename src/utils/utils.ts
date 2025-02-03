export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};


export const ObjIsEmpty = (obj: object): boolean => Object.keys(obj).length === 0;


export const getFullYear = (UNIX_timestamp:number|string) => {
    var a = new Date(typeof(UNIX_timestamp) === 'string'?parseInt(UNIX_timestamp):UNIX_timestamp);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year;
    return time;
}

export const getFullYearWithTime = (UNIX_timestamp:number|string) => {
    var a = new Date(typeof(UNIX_timestamp) === 'string'?parseInt(UNIX_timestamp):UNIX_timestamp);
    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var suffix = hour >= 12 ? "PM" : "AM";
    var hours = ((hour + 11) % 12 + 1)
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year + ', ' + hours + ':' + min + ' ' + suffix;
    return time;
}

export const REGXNO = /^[0-9]+$/
export const REGXEMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const STROGNPASSWORD =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).*$/
export const regexPAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
export const regexVehicle = /^[A-Z|a-z]{2}\s?[0-9]{1,2}\s?[A-Z|a-z]{0,3}\s?[0-9]{4}$/;
export const regexDl = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
export const regexGStno = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
export const regexmobilePattern = /^[0-9]+$/; 
export const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
