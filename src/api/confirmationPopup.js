window.onload = function() {
	document.querySelector('#popupDecline').addEventListener('click', () => {
		document.querySelector('#confirmationPopupQuestion').textContent = ''
		document.querySelector('.confirmation-popup-wrapper').classList.remove('opened')
		CONFRIMATION_CONTROLLER.resolve(false);
	})

	document.querySelector('#popupConfirm').addEventListener('click', () => {
		document.querySelector('#confirmationPopupQuestion').textContent = ''
		document.querySelector('.confirmation-popup-wrapper').classList.remove('opened')
		CONFRIMATION_CONTROLLER.resolve(true);
	})
}

let CONFRIMATION_CONTROLLER = null

export const confirmation = async message => {
	document.querySelector('.confirmation-popup-wrapper').classList.add('opened')
	document.querySelector('#confirmationPopupQuestion').textContent = message
	
	let resolve;
	let reject;
	const popupPromise = new Promise((ok, fail) => {
		resolve = ok;
		reject = fail;
	});

	CONFRIMATION_CONTROLLER= { resolve, reject };

	return popupPromise;
} 