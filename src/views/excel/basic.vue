<template>
  <div class="basic">
    <button style="width: 200px; height: 50px" @click="createExcel">create excel</button>
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { tableData, columnData } from './data';

export default {
  name: 'BasicExcel',
  computed: {
    exportedData() {
      return tableData;
    },
    headerData() {
      return columnData;
    },
  },
  mounted() {
    // console.log('exceljs', ExcelJS);
  },
  methods: {
    createExcel() {
      // 1. 初始化excel
      const workbook = new ExcelJS.Workbook();
      // console.log(workbook);
      workbook.creator = 'tianqing';

      // 2. 创建视图
      workbook.views = [{
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: 1,
        visibility: 'visible',
      }]

      const mySheet = workbook.addWorksheet('my sheet');

      // 3. 生成内容
      // 3.1 生成表头
      this.createHeader(mySheet);
      // mySheet.columns = [
      //   { header: '编号', key: 'id', width: 10 },
      //   { header: '姓名', key: 'name', width: 32 },
      // ];

      // const idCol = mySheet.getColumn('id');
      // const nameCol = mySheet.getColumn('name');

      // idCol.values = [1, 2, 4];
      // nameCol.values = ['jim', 'tom', 'lucy'];

      // 3.2 生成表身
      this.fillData(mySheet);
      // mySheet.addRow({ id: 1, name: 'John Doe' });
      // mySheet.addRow([2, 'tom']);

      // const myRow = mySheet.getRow(2);
      // myRow.getCell(2).value = 'tianqing'; // B2's value set to tianqing

      // const myRow4 = mySheet.getRow(4);
      // myRow4.values = {
      //   id: 13,
      //   name: 'Thing 1',
      // };

      // 4. 输出文件
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data]);
        saveAs(blob, 'text.xlsx');
      });
    },
    createHeader(worksheet) {
      // 创建表头
      worksheet.columns = this.headerData.map(item => {
        return {
          header: item.label,
          key: item.key,
          width: item.width ? item.width / 10 : 10,
        }
      });

      return worksheet;
    },
    fillData(worksheet) {
      // 填充数据
      this.exportedData.forEach(row => {
        worksheet.addRow(row);
      })

      return worksheet;
    },
  },
}
</script>
