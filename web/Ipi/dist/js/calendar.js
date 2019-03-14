
/************************************************ Calendrier finale : Debut ******************************************************************/
// <!-- <![CDATA[

// Project: Dynamic Date Selector (DtTvB) - 2006-03-16
// Script featured on JavaScript Kit- http://www.javascriptkit.com
// Code begin...
// Set the initial date.
var ds_i_date = new Date();
ds_c_month = ds_i_date.getMonth() + 1;
ds_c_year = ds_i_date.getFullYear();

// Output Element
var ds_oe = ds_getel('ds_calclass');
// Container
var ds_ce = ds_getel('ds_conclass');

// Get Element By Id
function ds_getel(id) {
	return document.getElementById(id);
}

// Get the left and the top of the element.
function ds_getleft(el) {
	var tmp = el.offsetLeft;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetLeft;
		el = el.offsetParent;
	}
	return tmp;
}
function ds_getright(el) {
	var tmp = el.offsetRight;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetRight;
		el = el.offsetParent;
	}
	return tmp;
}
function ds_gettop(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent
	while(el) {
		tmp += el.offsetTop;
		el = el.offsetParent;
	}
	return tmp;
}


// Output Buffering
var ds_ob = ''; 
function ds_ob_clean() {
	ds_ob = '';
}
function ds_ob_flush() {
	ds_oe.innerHTML = ds_ob;
	ds_ob_clean();
}
function ds_echo(t) {
	ds_ob += t;
}

var ds_element; // Text Element...

var ds_monthnames = [
'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]; // You can translate it for your language.

var ds_daynames = [
'Dim', 'Lun', 'Mar', 'Me', 'Jeu', 'Ven', 'Sam'
]; // You can translate it for your language.

// Calendar template
function ds_template_main_above(t) {
	return '<table cellpadding="1" cellspacing="1" class="ds_tbl">'
	     + '<tr>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_py();">&lt;&lt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_pm();">&lt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_hi();" colspan="3">[Fermer]</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_nm();">&gt;</td>'
		 + '<td class="ds_head" style="cursor: pointer" onclick="ds_ny();">&gt;&gt;</td>'
		 + '</tr>'
	     + '<tr>'
		 + '<td colspan="7" class="ds_head">' + t + '</td>'
		 + '</tr>'
		 + '<tr>';
}

function ds_template_day_row(t) {
	return '<td class="ds_subhead">' + t + '</td>';
	// Define width in CSS, XHTML 1.0 Strict doesn't have width property for it.
}

function ds_template_new_week() {
	return '</tr><tr>';
}

function ds_template_blank_cell(colspan) {
	return '<td colspan="' + colspan + '"></td>'
}

function ds_template_day(d, m, y) {
	//alert(String(y));
	y = String(y);
	return '<td class="ds_cell" onclick="ds_onclick(' + d + ',' + m + ',' + y + ')">' + d +'</td>';
	// Define width the day row.
}

function ds_template_main_below() {
	return '</tr>'
	     + '</table>';
}

// This one draws calendar...
function ds_draw_calendar(m, y) {
	// First clean the output buffer.
	ds_ob_clean();
	// Here we go, do the header
	ds_echo (ds_template_main_above(ds_monthnames[m - 1] + ' ' + y));
	for (i = 0; i < 7; i ++) {
		ds_echo (ds_template_day_row(ds_daynames[i]));
	}
	// Make a date object.
	var ds_dc_date = new Date();
	ds_dc_date.setMonth(m - 1);
	ds_dc_date.setFullYear(y);
	ds_dc_date.setDate(1);
	if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
		days = 31;
	} else if (m == 4 || m == 6 || m == 9 || m == 11) {
		days = 30;
	} else {
		days = (y % 4 == 0) ? 29 : 28;
	}
	var first_day = ds_dc_date.getDay();
	var first_loop = 1;
	// Start the first week
	ds_echo (ds_template_new_week());
	// If sunday is not the first day of the month, make a blank cell...
	if (first_day != 0) {
		ds_echo (ds_template_blank_cell(first_day));
	}
	var j = first_day;
	for (i = 0; i < days; i ++) {
		// Today is sunday, make a new week.
		// If this sunday is the first day of the month,
		// we've made a new row for you already.
		if (j == 0 && !first_loop) {
			// New week!!
			ds_echo (ds_template_new_week());
		}
		// Make a row of that day!
		ds_echo (ds_template_day(i + 1, m, y));
		// This is not first loop anymore...
		first_loop = 0;
		// What is the next day?
		j ++;
		j %= 7;
	}
	// Do the footer
	ds_echo (ds_template_main_below());
	// And let's display..
	ds_ob_flush();
	// Scroll it into view.
	//ds_ce.scrollIntoView();
}

// A function to show the calendar.
// When user click on the date, it will set the content of t.
function ds_sh(t) {
	dt_cur = t.value;
	var j_dt_cur = dt_cur.substr(0, 2);
	var m_dt_cur = dt_cur.substr(3, 2);
	var a_dt_cur = dt_cur.substr(6, 4);
	//alert('VALEUR CHAMPS : '+j_dt_cur);
	// Set the element to set...
	ds_element = t;
	// Make a new date, and set the current month and year.
	if(a_dt_cur<100) {
		if(a_dt_cur>50) a_dt_cur="19"+a_dt_cur;
		else a_dt_cur="20"+a_dt_cur;
	}
	
	if(j_dt_cur=='')
		var ds_sh_date = new Date();
	else
		var ds_sh_date = new Date(a_dt_cur,m_dt_cur-1,j_dt_cur);
	//var ds_sh_date = new Date(2009,05,29);
	//alert('THE DATE 1 IS : '+ds_sh_date);
	ds_c_month = ds_sh_date.getMonth() + 1;
	ds_c_year = ds_sh_date.getFullYear();
	//alert(ds_c_year);
	// Draw the calendar
	ds_draw_calendar(ds_c_month, ds_c_year);
	// To change the position properly, we must show it first.
	ds_ce.style.display = '';
	// Move the calendar container!
	the_left = ds_getleft(t) + t.offsetWidth;
	the_top = ds_gettop(t) + t.offsetHeight;
	ds_ce.style.left = the_left + 'px';
	ds_ce.style.top = the_top + 'px';
	// Scroll it into view.
	//ds_ce.scrollIntoView();
}

// Hide the calendar.
function ds_hi() {
	ds_ce.style.display = 'none';
}

// Moves to the next month...
function ds_nm() {
	// Increase the current month.
	ds_c_month ++;
	// We have passed December, let's go to the next year.
	// Increase the current year, and set the current month to January.
	if (ds_c_month > 12) {
		ds_c_month = 1; 
		ds_c_year++;
	}
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the previous month...
function ds_pm() {
	ds_c_month = ds_c_month - 1; // Can't use dash-dash here, it will make the page invalid.
	// We have passed January, let's go back to the previous year.
	// Decrease the current year, and set the current month to December.
	if (ds_c_month < 1) {
		ds_c_month = 12; 
		ds_c_year = ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	}
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the next year...
function ds_ny() {
	// Increase the current year.
	ds_c_year++;
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Moves to the previous year...
function ds_py() {
	// Decrease the current year.
	if(ds_c_year>1980)
	ds_c_year = ds_c_year - 1; // Can't use dash-dash here, it will make the page invalid.
	// Redraw the calendar.
	ds_draw_calendar(ds_c_month, ds_c_year);
}

// Format the date to output.
function ds_format_date(d, m, y) {
	// 2 digits month.
	m2 = '00' + m;
	m2 = m2.substr(m2.length - 2);
	// 2 digits day.
	d2 = '00' + d;
	d2 = d2.substr(d2.length - 2);
	//y = y.substr(y.length - 2);
	// YYYY-MM-DD
	//return y + '/' + m2 + '/' + d2;
	return d2 + '/' + m2 + '/' + y;
}

// When the user clicks the day.
function ds_onclick(d, m, y) {
	// Hide the calendar.
	//alert(y);
	y = String(y);
	y = String(y.substr(0,4));
	//alert(String(y));

	ds_hi();
	// Set the value of it, if we can.
	if (typeof(ds_element.value) != 'undefined') {
		ds_element.value = ds_format_date(d, m, y);
	// Maybe we want to set the HTML in it.
	} else if (typeof(ds_element.innerHTML) != 'undefined') {
		ds_element.innerHTML = ds_format_date(d, m, y);
	// I don't know how should we display it, just alert it to user.
	} else {
		alert (ds_format_date(d, m, y));
	}
}

// And here is the end.

// ]]> -->

/************************************************** Calendrier finale : Fin ****************************************************************/



var dName   =  new Array("Lu","Ma","Me","Je","Ve","Sa","Di")//eintag der Wochentagsnamen aus der localtext
var monName    =  new Array ("JANVIER","F&Eacute;VRIER","MARS","AVRIL","MAI","JUIN","JUILLET","AO&Ucirc;T","SEPTEMBRE","OCTOBRE","NOVEMBRE","D&Eacute;CEMBRE");
function makeCal(formS, formE, depImg, arrImg, n)
{
 this.name    =  n;
 this.calXpos    =  new Array();
 this.calYpos    =  new Array();
 this.calXpos[0] =  findPos(depImg).xPos - (nc? 40 : 0);
 this.calYpos[0] =  findPos(depImg).yPos + ((mac || br.unix)? 60 : (nc? 30 : 0));
 this.calXpos[1] =  findPos(arrImg).xPos - (nc? 40 : 0);
 this.calYpos[1] =  findPos(arrImg).yPos + ((mac || br.unix)? 60 : (nc? 30 : 0));
 this.outForm    =  new Array();
 this.outForm[0] =  formS;
 this.outForm[1] =  formE;
 this.posDiv        =  posDiv;
 this.initCal    =  initCal;
 this.nextMonth    =  nextMonth;
 this.pastMonth    =  pastMonth;
 this.changeYear    =  changeYear;
 this.goYear    =  goYear;
 this.writeCal    =  writeCal;
 this.wrForm     =  wrForm;
 this.dplCal     =  dplCal;
}

function posDiv()
{
 dRefS("calendar").left =  this.calAktX;
 dRefS("calendar").top  =  this.calAktY;
}

//function initCal(rdIdx, akIdx, x, y)
function initCal(rdIdx, akIdx)
{
 this.calAktForm    =  akIdx;
 //this.calAktX    =  x;
 //this.calAktY    =  y;
 this.calAktX    =  this.calXpos[akIdx];
 this.calAktY    =  this.calYpos[akIdx];
 var date        =  this.outForm[rdIdx].value;
 //alert (date) ;
 //var reg            =    /^([0-9]{1,2})[\.\,\-\/]([0-9]{1,2})[\.\,\-\/]([0-9]{2,4})$/;
 var reg            =    /^([0-9]{2,4})[\.\,\-\/]([0-9]{1,2})[\.\,\-\/]([0-9]{1,2})$/;
 
 if(reg.exec(date) && akIdx)
 {
 var datArr    =    reg.exec(date);
// datArr[3]    =    (datArr[3].length == 2)? "20" + datArr[3] : datArr[3];
 datArr[1]    =    (datArr[1].length == 2)? "20" + datArr[1] : datArr[1];
 datArr[2]    =    (datArr[2]> 0 )? datArr[2] - 1 : 11;
// aktDate         =    new Date(datArr[3], datArr[2], datArr[1]);
 aktDate         =    new Date(datArr[1], datArr[2], datArr[3]);
 }
 else
 {
 aktDate    =   new Date();
 } 
 aktMonth    =    aktDate.getMonth();
 aktYear        =    aktDate.getYear();
 if (aktYear <100) aktYear += 1900;
 aktDay        =    aktDate.getDate();
 aktDay        =    new Date(aktYear, aktMonth, aktDay);
 aktDay        =    aktDay.getTime();
 calendrier = akIdx;
 this.writeCal();
 this.posDiv();
 this.dplCal(1);
}

function writeCal()
{
 firstDay    =    new Date(aktYear, aktMonth, 1);
 firstDayId    =    firstDay.getDay();
 firstDayId    =    (firstDayId> 0)? firstDayId - 1 : 6;
 nextMonth    =    new Date(aktYear, aktMonth + 1 ,1);
 monthDur    =    nextMonth - (1000*60*60*23);
 lastDay        =    new Date(monthDur);
 lastDayDate    =    lastDay.getDate();
 if(ie4 || dom)
 {
 dRef("close").innerHTML =  '<span class=scf><a href="javascript:' + this.name + '.dplCal(0)" class="norm">X</a><\/span>';
 dRef("yearTd").innerHTML = '<span class=dayName><table cellpadding=0 cellspacing=0 border=0><tr><td rowspan=2 class=dayName>&nbsp;Année&nbsp;<input type=text name=year value=' + aktYear + ' size=2 maxlength=4 class=year onKeyPress="if (event.keyCode == 13) ' + this.name + '.changeYear(this.value); else if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;">&nbsp;<\/td><\/tr><tr><td><a href="javascript:onClick=' + this.name + '.goYear(1);"><img src="images/plus.gif" border=0><\/a><br><a href="javascript:onClick=' + this.name + '.goYear(-1);"><img src="images/moins.gif" border=0><\/a><\/td><\/tr><\/table><\/span>';
 dRef("backTd").innerHTML =  '<A class=norm href="Javascript:' + this.name + '.pastMonth();">&lt;&lt;</A>';
 dRef("monthTd").innerHTML =  '<span class=scf>' + monName[aktMonth]+ '<\/span>';
 dRef("nextTd").innerHTML =  '<A class=norm href="Javascript:' + this.name + '.nextMonth();">&gt;&gt;<\/A>';
 for(var k in dName) dRef("dayName" + k).innerHTML =  dName[k];
 }
 else if(nc)
 {
 table =  '<span class=border><table cellspacing=1 cellpadding="1" border="0">';
 table += '<tr><td id=yearTd class=dayName colspan="6" align="center"><span class=dayName><table cellpadding=0 cellspacing=0 border=0><tr><td rowspan=2>&nbsp;íæãíÉ ÚÜÜÇã&nbsp;<input type=text name=year value=' + aktYear + ' size=2 maxlength=4 class=year onKeyPress="if (event.keyCode == 13) ' + this.name + '.changeYear(this.value); else if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;">&nbsp;<\/td><\/tr><tr><td><a href="javascript:onClick=' + this.name + '.goYear(1);"><img src="images/plus.gif" border=0><\/a><br><a href="javascript:onClick=' + this.name + '.goYear(-1);"><img src="images/moins.gif" border=0><\/a><\/td><\/tr><\/table><\/span></td><td id=close class=dayName align="center"><a href="javascript:' + this.name + '.dplCal(0)" class="norm">X</a></td></tr>';
 table += '<td class=dayTd width="18"><A class=norm href="Javascript:' + this.name + '.pastMonth();">&lt;&lt;</A><\/td>';
 table += '<td class=dayTd colspan="5" align="center" width="90"><span class=scf>' + monName[aktMonth] + '<\/span><\/td>';
 table += '<td class=dayTd align="right" width="18"><A class=norm href="Javascript:' + this.name + '.nextMonth();">&gt;&gt;<\/A><\/td><\/tr><tr>';
 for(var k in dName) table += '<td id="dayName' + k + '" class="dayName" align="right" width="18">' + dName[k] + '<\/td>';
 table += '<\/tr><tr>';
 }
 var cnt =  1;
 for(var i = 0; i <42; i++)
 {
 var txt, aTag, table;
 var temp    =  new Date(aktYear, aktMonth, cnt);
 if(temp.getTime() <aktDay)
 {
 aTag    =    '<a class=norm href="Javascript:' + this.name + '.wrForm(' + this.calAktForm + ', ' + cnt + '); ">';
 txt        =    aTag + cnt + '<\/a>'
 }
 else if(temp.getTime() == aktDay)
 {
 aTag    =    '<a class=scf href="Javascript:' + this.name + '.wrForm(' + this.calAktForm + ', ' + cnt + ');">';
 txt        =    aTag + cnt + '<\/a>';
 }
 else
 {
  aTag    =    '<a class=norm href="Javascript:' + this.name + '.wrForm(' + this.calAktForm + ', ' + cnt + '); ">';
 txt        =    aTag + cnt + '<\/a>';
 }
 if(firstDayId <= i && cnt <= lastDayDate)
 {
 if(ie4 || dom) dRef("day" + i).innerHTML =  txt;
 else if(nc)
 {
 table += '<td' + ((i + 1)%7 == 0? ' class="sun"' : ' class="dayTd"') + ' align="right">' + txt + '<\/td>';
 table += (i + 1)%7 == 0? '<\/tr>' + (i <41? '<tr>' : ''): '';
 }
 cnt++;
 }
 else
 {
 if(ie4 || dom) dRef("day" + i).innerHTML =  "&nbsp;";
 else if(nc)
 {
 table += '<td' + ((i + 1)%7 == 0? ' class="sun"' : ' class="dayTd"') + '>&nbsp;<\/td>';
 table += (i + 1)%7 == 0? '<\/tr>' + (i <41? '<tr>' : ''): '';
 }
 }
 }
 if(nc)
 {
 table += '</table></span>';
 writeDiv(dRef('calendar'), table);
 }
}

function nextMonth()
{
 if (aktMonth <12) aktMonth += 1;
 if (aktMonth == 12)
 {
 aktYear += 1;
 aktMonth = 0;
 }
 this.writeCal();
}

function pastMonth()
{
 if (aktMonth> -1) aktMonth -= 1;
 if (aktMonth == -1)
 {
 aktYear -= 1;
 aktMonth = 11;
 }
 this.writeCal();
}
var arrivalSet = false;

function wrForm(index, id)
{
 var depDate                          =  new Date(aktYear,aktMonth, parseInt(id)+1);
 var depDay                           =  depDate.getDate();
 var depMonth                         =    depDate.getMonth();
 var depYear                             =    depDate.getYear();
 if (depYear <100) depYear          += 1900;
 this.outForm[index].value            =  aktYear + "-" + (aktMonth + 1) + "-" + id;
 if(index == 0 && (!arrivalSet || this.outForm[0].value>this.outForm[1].value)) this.outForm[1].value = depYear + "-" + (aktMonth + 1) + "-" + id;
 else arrivalSet = true;
 this.dplCal(0);
}

function dplCal(stat)
{
 dRefS("calendar").visibility             =  stat? "visible" : "hidden";
}

function changeYear(year)
{
  if (year != "")
  {
     aktYear = parseInt(year);
  }
  if (aktYear < 100)    aktYear += 1900;

	this.writeCal();
}

function goYear(pas)
{
  aktYear += pas;
  this.writeCal();
}