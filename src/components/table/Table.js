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

      document.addEventListener('mousemove', e => {
        let delta = e.pageX - coordinates.right;
        parent.element.style.width = (coordinates.width + delta) + 'px';
        console.log(parent.element.style.width);
        // parent.element.style.width = (coordinates.width + delta) + 'px';
      })

    };
  }

  onMousemove() {
    // console.log('mousemove');
  }

  onMouseup() {
    // console.log('mouseup');
   }
}