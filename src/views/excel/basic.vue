<template>
  <div class="basic">
    <button style="width: 200px; height: 50px" @click="createExcel">create excel</button>
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default {
  name: 'BasicExcel',
  mounted() {
    console.log('exceljs', ExcelJS);
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

      // 2. 生成内容
      mySheet.columns = [
        { header: '编号', key: 'id', width: 10 },
        { header: '姓名', key: 'name', width: 32 },
      ];

      // const idCol = mySheet.getColumn('id');
      // const nameCol = mySheet.getColumn('name');

      // idCol.values = [1, 2, 4];
      // nameCol.values = ['jim', 'tom', 'lucy'];

      mySheet.addRow({ id: 1, name: 'John Doe' });
      mySheet.addRow([2, 'tom']);

      const myRow = mySheet.getRow(2);
      myRow.getCell(2).value = 'tianqing'; // B2's value set to tianqing

      const myRow4 = mySheet.getRow(4);
      myRow4.values = {
        id: 13,
        name: 'Thing 1',
      };

      // 3. 输出文件
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data]);
        saveAs(blob, 'text.xlsx');
      });
    },
  },
}
</script>
