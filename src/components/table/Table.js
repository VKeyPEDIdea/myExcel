import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { Dom } from "./../../core/dom";

export class Table extends ExcelComponent {
  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    });
  }

  static getClassName() {
    return 'excel__table';
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const resizer = new Dom(event.target);
      const parent = resizer.getClosest('[data-column-resizable="true"]');
			const coordinates = parent.getCoordinates();
			
      document.addEventListener('mousemove', (e) => Table.onMousemove(e, parent, coordinates));
			
    };
  }
	
  static onMousemove(e, parent, coordinates) {
		let delta = e.pageX - coordinates.right;		
		parent.element.style.width = (coordinates.width + delta) + 'px';
    // console.log('mousemove');
  }
	
  onMouseup(event) {
		if (event.target.dataset.resize) {
			const resizer = new Dom(event.target);
			console.log(resizer);
			const parent = resizer.getClosest('[data-column-resizable="true"]');
			const coordinates = parent.getCoordinates();
			
			document.removeEventListener('mousemove', (e) => Table.onMousemove(e, parent, coordinates));
		}
   }
}