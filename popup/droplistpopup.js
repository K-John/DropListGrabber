var DropListPopup = (function() {

	var listElement = document.getElementById('list');
	var dataString = "";
	var loopCount = 0;
	var keys;

	var updateDrops = function() {

		chrome.storage.local.get(null, function(items) {

			keys = Object.keys(items);

			for (key of keys) {
				var html = "<li>" + key + "</li>";
				listElement.insertAdjacentHTML('beforeend', html);
			}
		});
	};

	var exportList = function(callback) {

		var key = keys[loopCount];

		chrome.storage.local.get([key], function (data) {

			dataString += formatText(key,data);

			if (loopCount < keys.length - 1) {

				loopCount++;
				exportList(callback);

			} else {
				callback();
			}
		});
	};

	var resetList = function() {

		chrome.storage.local.clear(function () {

			var error = chrome.runtime.lastError;

			if (!error) {
				listElement.innerHTML = '';
			}
		});
	};

	var formatText = function(key, item) {

		var string = "";
		string = string.concat("// " + item[key].name + "\n");
		string = string.concat("Npc:");
		for (id of item[key].id) {
			string += (" " + id);
		}
		string = string.concat("\n");
		for (drop of item[key].drops) {
			string += (drop.rarity + " " + drop.id + " " + drop.quantity + " // " + drop.item + "\n");
		}
		string += "\n\n";
		return string;
	};

	var saveFile = function() {

		console.log("Made it to save file");
		
		var d = new Date();
		var element = document.createElement('a');

		element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(dataString));
		element.setAttribute('download', 'drops-' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '.txt');
		element.style.display = 'none';

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	return {
		init: function() {
			// Get current list of drops and update UI
			updateDrops();
			// Initialize listeners for export and reset
			save.onclick = function() { exportList(saveFile); };
			reset.onclick = function() { resetList(); };
		}
	}
})();

DropListPopup.init();