var DropListGrabber = (function() {

	var title = document.getElementById("firstHeading").textContent;
	var dropTables = document.getElementsByClassName("item-drops");

	var dataRowIndex = { rarity: 0, item: 0, quantity: 0 }; // The table header titles we're looking for
	var dataArray = [];

	var DropList = function (name, id, drops) {
		this.name = name;
		this.id = id;
		this.drops = drops;
	};

	var Drop = function (rarity, item, quantity, id) {
		this.rarity = rarity;
		this.item = item;
		this.quantity = quantity;
		this.id = id;
	};

	var getHeaderIndexes = function(headerRows) {

		var indexKeys = Object.keys(dataRowIndex);
		var rowCount = 0;

		for (headerRow of headerRows) {

			if (headerRow.hasChildNodes()) {
				rowCount++;
			}

			for (key of indexKeys) {

				if (headerRow.textContent.toLowerCase() == key) {
					dataRowIndex[key] = rowCount;
				}
			}
		}
		return true;
	};

	var getData = function(tableRows) {

		var indexes = Object.entries(dataRowIndex);
		var rowData = {};

		for (tableRow of tableRows) {

			for ([key, value] of indexes) {
				rowData[key] = cleanString(key, tableRow.childNodes[value - 1].textContent);
				// .className = "table-bg-green", "table-bg-yelow", "table-bg-orange"
			}

			// TODO : Remove (m) from name
			var itemName = rowData[indexes[1][0]].replace('(m)', ''); // Remove (m) from item name
			var itemId = compareLists(itemList, itemName, true);
			/*if (itemId.length > 1) {
				itemName = "DUPLICATE IDS FOUND !! -- " + rowData[indexes[1][0]];
			}*/
			console.log(rowData);
			var drop = new Drop(rowData[indexes[0][0]], itemName, rowData[indexes[2][0]], itemId[0]);
			dataArray.push(drop);
		}
	};

	var compareLists = function(list, seekValue, acceptDuplicates) {

		var indexes = Object.entries(list);
		var returnValue = [];

		for ([key, value] of indexes) {

			if (value == seekValue) {

				if (acceptDuplicates) {
					
					returnValue.push(key);
				} else {
					return key;
				}
			}
		}
		return returnValue;
	};

	var cleanString = function(key, value) {

		if (key == "rarity") {

			value = value.replace(/1\//g, '');
			value = value.replace(/,/g, '');
			if (value.includes('[')) {
				value = value.substr(0, value.indexOf('['));
			}
			if (value.includes('.')) {
				value = value.substr(0,value.indexOf('.'));
			}
			if (value.includes('–')) {
				value = value.substr(value.indexOf('–')+1)
			}
			if (value.includes(';')) {
				value = value.substr(value.indexOf(';')+1);
			}
			if (value.toLowerCase() == "always") {
				value = "1";
			}
			if (value.toLowerCase() == "common") {
				value = "15";
			}
			if (value.toLowerCase() == "uncommon") {
				value = "40";
			}
			if (value.toLowerCase() == "rare") {
				value = "100";
			}
			if (value.toLowerCase() == "varies") {
				value = "10";
			}
			value = value.trim();
		}
		if (key == "quantity") {

			value = value.replace(/,/g, '');
			value = value.replace('–', '-');
			if (value.includes(';')) {
				value = value.substr(0,value.indexOf(';'));
			}
			if (value.includes('(')) {
				value = value.substr(0,value.indexOf('('));
			}
		}
		return value;
	};

	return {

		execute: function() {

			for (dropTable of dropTables) {

				var headerRows = dropTable.querySelector("thead").querySelector("tr").childNodes;
				var tableRows = dropTable.querySelector("tbody").querySelectorAll("tr");

				if (getHeaderIndexes(headerRows)) {
					getData(tableRows);
				}
			}
			return new DropList(title, compareLists(npcList, title, true), dataArray);
		}
	}
})();