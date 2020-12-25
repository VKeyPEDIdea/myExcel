export function switchToolState(key, value, toolBtn) {
	if (key != 'align') {
		value
			? toolBtn.classList.add('active')
			: toolBtn.classList.remove('active');  
	}
	if (value == undefined) toolBtn.classList.add('active');
	
}

export function resetBtn() {
	// for (let key in this.tools) {
	// 	this.tools[key].classList.remove('active');
	// }

	// this.tools.textAlignLeft.classList.add('active');
}