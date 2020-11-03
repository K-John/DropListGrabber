/*
* 1. Add a button to the page and add a listener for its click.
* 2. Run the Drop List Grabber and store the result in chrome local storage.
* 3. Update the button style to show that it's been clicked.
*/
var button = '<div id="dropListGrabber" style="display: inline-block; margin-left: 20px; background: #bea785; font-size: 16px; padding: 8px 13px; color: #54493b; vertical-align: bottom; cursor: pointer;">Grab Drops</div>';

if (document.getElementById('Drops') != undefined) {

	document.getElementById('firstHeading').insertAdjacentHTML('beforeend', button);

	dropListGrabber.onclick = function (element) {

		var result = DropListGrabber.execute();
		chrome.storage.local.set({[result.name]: result});
		console.log(result);

		var button = document.getElementById('dropListGrabber');
		button.style.background = '#94b195';
		button.style.color = '#2e432e';
		button.style.cursor = 'default';
	};
}

	firstHeading.onclick = function (element) {
		var result = DropListGrabber.execute();
		chrome.storage.local.set({[result.name]: result});
		console.log(result);
	}

