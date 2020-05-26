<template>
  <div class="basic">
    <button @click="createExcel">create excel</button>
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
      console.log(workbook);
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

      workbook.addWorksheet('my sheet');

      // 2. 生成内容

      // 3. 输出文件
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data]);

        saveAs(blob, 'text.xlsx');
      });
    },
  },
}
</script>
