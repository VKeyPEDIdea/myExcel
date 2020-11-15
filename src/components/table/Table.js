import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
  constructor(root) {
    super(root);
  }

  static getClassName() {
    return 'excel__table';
  }

  toHTML() {
    return createTable();
  }
}

// `  
// <!-- First table row -->
// <div class="row">

//   <!-- First table cell -->
//   <div class="cell-start"></div>

//   <!-- Table-header -->
//   <div class="table-header">
//     <div class="column">A</div>
//     <div class="column">B</div>
//     <div class="column">C</div>
//   </div>
// </div>

// <!-- Row -->
// <div class="row">
//   <div class="row-number">1</div>
//   <div class="data">
//     <div class="cell selected" contenteditable="">1fsdfdsf</div>
//     <div class="cell" contenteditable="">2dsfdsfsd</div>
//     <div class="cell" contenteditable="">3fdsfdsfsdf</div>
//   </div>
// </div>
// `