import { actionTypes } from '../redux/actionTypes';

export function switchToolState(key, value, toolList) {
	const toolBtn = getToolByState(toolList, key, value);
	const align = {
		left: toolList[actionTypes.setStyle.textAlignLeft],
		center: toolList[actionTypes.setStyle.textAlignCenter],
		right: toolList[actionTypes.setStyle.textAlignRight],
	};

	if (key !== 'align') {
		if (value) {
			toolBtn.classList.add('active');
		} else {
			toolBtn.classList.remove('active');
		}
	}

	if (value === undefined) toolBtn.classList.add('active');

	switch (value) {
		case 'left':
			toolBtn.classList.add('active');
			turnOff(align.center, align.right);
			break;

		case 'center':
			toolBtn.classList.add('active');
			turnOff(align.left, align.right);
			break;

		case 'right':
			toolBtn.classList.add('active');
			turnOff(align.left, align.center);
			break;

		default:
			break;
	}
}

function turnOff() {
	// eslint-disable-next-line prefer-rest-params
	Object.values(arguments).forEach(tool => {
		tool.classList.remove('active');
	});
}

function getToolByState(toolsList, key, value) {
	let tool;

	switch (key) {
		case 'bold':
			tool = toolsList[actionTypes.setStyle.textBold];
			break;

		case 'italic':
			tool = toolsList[actionTypes.setStyle.textItalic];
			break;

		case 'underline':
			tool = toolsList[actionTypes.setStyle.textUnderline];
			break;

		case 'align':

			if (value === 'left') {
				tool = toolsList[actionTypes.setStyle.textAlignLeft];
			} else if (value === 'center') {
				tool = toolsList[actionTypes.setStyle.textAlignCenter];
			} else if (value === 'right') {
				tool = toolsList[actionTypes.setStyle.textAlignRight];
			}

			break;
		default:
			break;
	}

	return tool;
}

export function resetBtn(toolList) {
	Object.keys(toolList).forEach(key => {
		toolList[key].classList.remove('active');
	});

	toolList.textAlignLeft.classList.add('active');
}