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
