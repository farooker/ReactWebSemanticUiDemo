var today = new Date();
var yyyy = today.getFullYear();
var MM = String(today.getMonth() + 1).padStart(2,'0');
var dd = String(today.getDate()).padStart(2,'0');
var hh = String(today.getHours()).padStart(2,'0');
var mm = String(today.getTime()).padStart(2,'0');
var ss = String(today.getSeconds()).padStart(2,'0');
var ms = String(today.getMilliseconds()).padStart(2,'0');

today = yyyy+MM+dd+hh+mm+ss+ms;

export default today;