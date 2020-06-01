<template>
  <div class="basic">
    <button style="width: 200px; height: 50px" @click="createExcel">create multi-header excel</button>
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default {
  name: 'BasicExcel',
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
      mySheet.columns = [
        { header: '编号', key: 'id', width: 10 },
        { header: '姓名', key: 'name', width: 32 },
      ];

      // const idCol = mySheet.getColumn('id');
      // const nameCol = mySheet.getColumn('name');

      // idCol.values = [1, 2, 4];
      // nameCol.values = ['jim', 'tom', 'lucy'];

      // 4. 输出文件
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data]);
        saveAs(blob, 'multi-header.xlsx');
      });
    },
  },
}
</script>
