/**
 * カレンダーを生成するライブラリ
 */

/**
 * @param obj target HTML element
 */
function CalendarCreator(target)
{
	this.target           = target;
	this.year             = null;
	this.displayMonthList = {};
	this.dayName          = ['日', '月', '火', '水', '木', '金', '土'];
	this.dayNameEn        = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	this.customClick      = null;
	this.customMouseOver  = null;
	this.customMouseOut   = null;
	this.customDateList   = {};
}

/**
 * @param string year Ex. '2017'
 * @return this
 */
CalendarCreator.prototype.setYear = function (year)
{
	this.year = year;
	return this;
}

/**
 * @param int[] array Ex. [1, 3, 12]
 * @return this
 */
CalendarCreator.prototype.setDisplayMonthList = function (array)
{
	for (var i = 0; i <= array.length; i++) {
			this.displayMonthList[array[i]] = array[i];
	}

	return this;
}

/**
 * @param string array Ex. ['2018-01-01', '2018-04-05']
 * @return this
 */
CalendarCreator.prototype.setCustomDateList = function (array)
{
	for (var i = 0; i <= array.length; i++) {
		this.customDateList[array[i]] = array[i];
	}

	return this;
}

/**
 * @param object func Ex. function () {}
 * @return this
 */
CalendarCreator.prototype.setCustomClick = function (func)
{
	this.customClick = func;
	return this;
}

/**
 * @param object func Ex. function () {}
 * @return this
 */
CalendarCreator.prototype.setCustomMouseOver = function (func)
{
	this.customMouseOver = func;
	return this;
}

/**
 * @param object func Ex. function () {}
 * @return this
 */
CalendarCreator.prototype.setCustomMouseOut = function (func)
{
	this.customMouseOut = func;
	return this;
}

CalendarCreator.prototype.create = function ()
{
	var dateList  = this._getDateList();

	var parentDiv = document.createElement('div');
	parentDiv.classList.add('calendar_parent');

	for (month in dateList) {
		var frameDiv = document.createElement('div');
		frameDiv.classList.add('calendar_frame');

		var table = document.createElement('table');
		table.style.borderCollapse = 'collapse';
		table.classList.add('calendar_table');

		var row   = Math.floor((dateList[month].length / 7) + 1);
		var count = 0;

		var monthNameTr = document.createElement('tr');
		var monthNameTd = document.createElement('td');
		monthNameTd.innerText = month + '月';
		monthNameTd.classList.add('calendar_month');
		monthNameTd.setAttribute('colspan', '7');
		monthNameTr.appendChild(monthNameTd);
		table.appendChild(monthNameTr);

		for (var i = 0; i <= row; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < 7; j++) {
				if (0 === i) {
					tr.classList.add('calendar_header');
					var th = document.createElement('th');
					th.classList.add(this.dayNameEn[j]);
					th.innerText = this.dayName[j];
					tr.appendChild(th);
				} else {
					tr.classList.add('calendar_body');
					var td = document.createElement('td');

					date = null;
					if (undefined !== dateList[month][count]) {
						var object = dateList[month][count];
						if (this.dayNameEn[j] === object.day) {
							td.classList.add(this.dayNameEn[j]);
							td.setAttribute('id', object.ymd);
							date = object.date;
							count++;

							if (true === (object.ymd in this.customDateList)) {
								td.classList.add('calendar_custom_date');
							}

							if (null !== this.customClick) {
								td.addEventListener('click', this.customClick);
							}

							if (null !== this.customMouseOver) {
								td.addEventListener('mouseover', this.customMouseOver);
							}

							if (null !== this.customMouseOut) {
								td.addEventListener('mouseout', this.customMouseOut);
							}
						}
					}

					td.innerText = date;
					tr.appendChild(td);
				}
			}
			table.appendChild(tr);
		}

		frameDiv.appendChild(table);
		parentDiv.appendChild(frameDiv);
	}

	this.target.appendChild(parentDiv);
}

/**
 * @return object[]
 * Ex. [
 *    3 => [
 *      {day: 'wednesday', date: 3, ymd: '2018-01-03'},
 *      {day: 'monday', date: 14, ymd: '2018-05-14'}
 *    ],
 *    12 => [
 *      {day: 'wednesday', date: 3, ymd: '2018-01-03'},
 *      {day: 'monday', date: 14, ymd: '2018-05-14'}
 *    ]
 *  ]
 */
CalendarCreator.prototype._getDateList = function ()
{
	var year = (new Date()).getFullYear();
	if (null !== this.year) {
		year = (new Date(this.year + '-01-01')).getFullYear();
	}

	var dateList = {};
	for (var i = 0; i < 365; i++) {
		var date  = new Date(year + '-01-01');
		date.setDate(date.getDate() + i);
		var month = date.getMonth() + 1;

		if (false === (month in this.displayMonthList)
			&& 0 !== Object.keys(this.displayMonthList).length
		) {
			continue;
		}

		if (undefined === dateList[month]) {
			dateList[month] = [];
		}

		dateList[month].push({
			day:  this.dayNameEn[date.getDay()],
			date: date.getDate(),
			ymd: date.getFullYear() +
				'-' +
				this._formatNum(date.getMonth() + 1) +
				'-' +
				this._formatNum(date.getDate())
		});
	}

	return dateList;
}

/**
 * @param string value
 * @return string Ex. '1' -> '01', '12' -> '12'
 */
CalendarCreator.prototype._formatNum = function (value)
{
	if (1 === (new String(value)).length) {
		return '0' + value;
	}

	return value;
}
