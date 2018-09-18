# CalendarCreator
  
```html
<html lang="jp">  
<head>  
<!-- カレンダーのデザインはCSSで独自指定する -->  
<style>  
  
.calendar_frame {  
    display: inline-block;  
    margin: 10px; 
    vertical-align: top
}  
  
.calendar_header th,  
.calendar_body td  
{  
	border: solid 1px #cccccc;  
	text-align: center;  
	height: 25px;  
	width: 25px;  
}  
  
.calendar_month {  
	font-weight: bold;  
	text-align: center;  
}  

.calendar_header .sunday {color: red;}  
.calendar_body .sunday, .calendar_custom_date {background-color: #ff93a8;}  
.calendar_header .saturday {color: blue;}  
.calendar_body .saturday {background-color: #93d7ff;}  
  
</style>  
<head>  
<body>  
<script src="./CalendarCreator.js"></script>  
<script>  
(function () {  
	var calendarCreator = new CalendarCreator(document.body); //コンストラクタにカレンダーを表示させたい要素を指定  
	calendarCreator  
		.setYear('2017') //表示したい年度を指定  
		.setDisplayMonthList([1, 2, 12]) //表示したい月を指定  
		.setCustomDateList(['2018-01-04', '2018-12-13']) //独自の祝日を指定  
		.setCustomClick(function () {  
			console.log('click');
			console.log(this.getAttribute('id'));  
		}) //独自のクリックイベントを指定  
		.setCustomMouseOver(function () {  
			console.log('mouseOver');  
		}) //独自のマウスオーバーイベントを指定  
		.setCustomMouseOut(function () {  
			console.log('mouseOut');  
		}) //独自のマウスアウトイベントを指定  
		.create();  
} ());  
</script>  
</body>  
</html>  
```
