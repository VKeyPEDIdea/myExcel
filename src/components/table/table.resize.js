import { Dom } from '../../core/dom';

export function resizeHandler(event, component) {
  return new Promise(resolve => {
    const resizer = new Dom(event.target);
    const data = resizer.data.resize;
    const parent = resizer.getClosest('[data-resizable="true"]');
    const coordinates = parent.getCoordinates();
    const attribute = parent.data.tableX;
    const columnCells = component.root.element.querySelectorAll(`[data-table-x="${attribute}"]`);
    let delta, value;

    Dom.setStyles(resizer, {
      opacity: 1,
    });

    document.onmousemove = e => {
      switch (data) {
        case 'col':
          delta = e.pageX - coordinates.right;
          value = coordinates.width + delta;
          Dom.setStyles(resizer, {
            right: `${-delta}px`,
          });
          break;

        case 'row':
          delta = e.pageY - coordinates.bottom;
          value = coordinates.height + delta;
          Dom.setStyles(resizer, {
            bottom: `${-delta}px`,
          });
          break;
        default:
          break;
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmousedown = null;

      Dom.setStyles(resizer, {
        opacity: null,
      });

      switch (data) {
        case 'col':
          columnCells.forEach(cell => {
            Dom.setStyles(cell, {
              width: `${value}px`,
            });
          });
          Dom.setStyles(resizer, {
            right: '-2px',
          });
          break;

        case 'row':
          Dom.setStyles(parent, {
            height: `${value}px`,
          });
          Dom.setStyles(resizer, {
            bottom: '-2px',
          });
          break;
        default:
          break;
      }

      resolve({
        resizeType: data,
        id: parent.data.tableX || parent.data.tableY,
        value,
      });
    };
  });
}