tippy('.btn', {
  content: "Copied!",
  placement: 'right',
  arrow: 'true',
  animation: 'scale-with-inertia',
  theme: 'dark',
  trigger: 'click',
  delay: [0,100],
});

var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});


var acc = document.getElementsByClassName("tzbar accordion");
var panel = document.getElementsByClassName('panel');
for (var i = 0; i < acc.length; i++) {
	acc[i].onclick = function() {
		var setClasses = !this.classList.contains('active');
		setClass(acc, 'active', 'remove');
		setClass(panel, 'show', 'remove');
		if (setClasses) {
			this.classList.toggle("active");
			this.nextElementSibling.classList.toggle("show");
		}
    }
}
function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
    	els[i].classList[fnName](className);
    }
}
countdownTimer();
function countdownTimer() {
	var startTime = "2019-08-03 16:00:00";
	var stopTime = "2019-08-03 19:00:00";
	var allTimeZones = ["Etc/GMT+12", "Etc/GMT+11", "Etc/GMT+10", "Etc/GMT+9", "Etc/GMT+8", "Etc/GMT+7", "Etc/GMT+6", "Etc/GMT+5", "Etc/GMT+4", "Etc/GMT+3", "America/St_Johns", "Etc/GMT+2", "Etc/GMT+1", "Etc/GMT+0",
						"Etc/GMT-1", "Etc/GMT-2","Etc/GMT-3", "Etc/GMT-4", "Asia/Tehran", "Etc/GMT-5", "Asia/Kolkata", "Asia/Kathmandu", "Etc/GMT-6", "Asia/Yangon", "Etc/GMT-7", "Etc/GMT-8", "Etc/GMT-9", "Australia/Adelaide", "Etc/GMT-10", "Etc/GMT-11", "Etc/GMT-12", "Etc/GMT-13", 
						"Etc/GMT-14"]  
	var buttonId = ["timerm12", "timerm11", "timerm10", "timerm09", "timerm08", "timerm07", "timerm06", "timerm05", "timerm04", "timerm03", "timerm2p5", "timerm02", "timerm01", "timerp00", "timerp01", "timerp02",
					"timerp03", "timerp04", "timerp4p5", "timerp05", "timerp5p5", "timerp5p3", "timerp06", "timerp6p5", "timerp07", "timerp08", "timerp09", "timerp9p5", "timerp10", "timerp11", "timerp12", "timerp13", "timerp14"];
	var buttonTimerId = ["displaytimerm12", "displaytimerm11", "displaytimerm10", "displaytimerm09", "displaytimerm08", "displaytimerm07", "displaytimerm06", "displaytimerm05",
						 "displaytimerm04", "displaytimerm03", "displaytimerm2p5", "displaytimerm02", "displaytimerm01", "displaytimerp00", "displaytimerp01", "displaytimerp02", "displaytimerp03",
						 "displaytimerp04", "displaytimerp4p5", "displaytimerp05", "displaytimerp5p5", "displaytimerp5p3", "displaytimerp06", "displaytimerp6p5", "displaytimerp07", "displaytimerp08", "displaytimerp09", "displaytimerp9p5", "displaytimerp10", "displaytimerp11", 
						 "displaytimerp12", "displaytimerp13", "displaytimerp14"];
	var tzStrings = ["UTC -12 | US Minor Outlying Islands |", "UTC -11 | American Samoa |", "UTC -10 | US Hawaii |", "UTC -09 | French Polynesia |", "UTC -08 | US Alaska |", "UTC -07 | Canada Pacific - US Western |", "UTC -06 | Canada - Costa Rica - Guatemala - US Mountain |", "UTC -05 | Mexico - Panama - US Central |", "UTC -04 | Canada - US Eastern |", "UTC -03 | Argentina - Brazil - Canada Atlantic - Chile |", "UTC -02½ | Canada |", "UTC -02 | Greenland |", "UTC -01 | Cape Verde |", "UTC +00 | Iceland |", "UTC +01 | Portugal - United Kingdom |", "UTC +02 | France - Germany - Italy - South Africa - Spain |", "UTC +03 | Finland - Greece - Israel - Russia - Turkey |", "UTC +04 | Madagascar - Qatar - United Arab Emirates |", "UTC +04½ | Afghanistan |", "UTC +05 | Pakistan |", "UTC +05½ | India - Sri Lanka |", "UTC +05¾ | Nepal |", "UTC +06 | Bangladesh |", "UTC +06½ | Myanmar |", "UTC +07 | Indonesia - Thailand - Vietnam |", "UTC +08 | Hong Kong - Philippines - Singapore - Taiwan |", "UTC +09 | Japan - South Korea |", "UTC +09½ | Australia |", "UTC +10 | Australia |", "UTC +11 | New Caledonia - Russia |", "UTC +12 | New Zealand |", "UTC +13 | Tonga - Samoa |", "UTC +14 | Kiribati |"];
	var now = moment.utc();
	var distance = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	for (var cnt = 0; cnt < allTimeZones.length; cnt++) {
		var eventTime = moment.tz(startTime, allTimeZones[cnt]);
		document.getElementById(buttonId[cnt]).innerHTML = "<strong>" + tzStrings[cnt] + "</strong><br>Event starts at: " + eventTime.local().format("YYYY-MM-DD HH:mm:ss") + " " + moment.tz(moment.tz.guess()).zoneAbbr();
	}
	continueTimer();
	function continueTimer() {
		now = moment();
		for (var cnt = 0; cnt < buttonId.length; cnt++) {
			var eventStartTime = moment.tz(startTime, allTimeZones[cnt]);
			var eventStopTime = moment.tz(stopTime, allTimeZones[cnt]);
			distance = eventStartTime.unix() - now.unix();
			if (distance >= 0) {
				days = Math.floor(distance / (60 * 60 * 24));
				hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
				minutes = Math.floor((distance % (60 * 60)) / (60));
				seconds = Math.floor((distance % (60)) / 1);
				document.getElementById(buttonTimerId[cnt]).innerHTML = "Event begins in: " + ("0" + days).slice(-2) + "d " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";		
			}
			if (distance < 0 && distance >= eventStartTime.unix() - eventStopTime.unix()) {
				document.getElementById(buttonId[cnt]).style.backgroundColor="#F995FF";
				distance = eventStopTime.unix() - now.unix();
				days = Math.floor(distance / (60 * 60 * 24));
				hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
				minutes = Math.floor((distance % (60 * 60)) / (60));
				seconds = Math.floor((distance % (60)) / 1);
				document.getElementById(buttonTimerId[cnt]).innerHTML = "Event in progress<br> Event ends in: " + ("0" + days).slice(-2) + "d " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";
			}
			if (distance < eventStartTime.unix() - eventStopTime.unix()) {
				document.getElementById(buttonId[cnt]).active = false;
				document.getElementById(buttonId[cnt]).disabled = true;
				document.getElementById(buttonId[cnt]).style.backgroundColor="#DDDDDD";
				document.getElementById(buttonTimerId[cnt]).innerHTML = "Event has ended";
			}
		}
		setTimeout(continueTimer, 1000);
	}
}
