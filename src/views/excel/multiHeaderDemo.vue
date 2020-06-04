<template>
  <div class="basic">
    <button style="width: 200px; height: 50px" @click="createExcel">multi-header excel demo</button>
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default {
  name: 'DemoExcel',
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

      // 添加表头
      mySheet.getRow(1).values = ['种类', '销量', '', '', '', '店铺'];
      mySheet.getRow(2).values = ['', '2018-05', '2018-06', '2018-07', '2018-08', ''];

      // 此处仅为表头定义，去除了header字段
      mySheet.columns = [
        { key: 'store', width: 30 },
        { key: 'category', width: 30 },
        { key: '2018-08', width: 30 },
        { key: '2018-05', width: 30 },
        { key: '2018-06', width: 30 },
        { key: '2018-07', width: 30 },
      ];
      const data = [
        {
          category: '衣服',
          '2018-05': 300,
          '2018-06': 230,
          '2018-07': 730,
          '2018-08': 630,
          '2018-066': 782,
          store: '王小二旗舰店'
        },
        {
          category: '零食',
          '2018-05': 672,
          '2018-06': 826,
          '2018-07': 302,
          '2018-08': 389,
          store: '吃吃货'
        }
      ];
      mySheet.addRows(data)

      // 合并单元格
      mySheet.mergeCells(1, 2, 1, 5);// 第1行  第2列  合并到第1行的第5列
      mySheet.mergeCells(1, 1, 2, 1);
      mySheet.mergeCells(1, 6, 2, 6);

      // 设置样式
      // mySheet.getCell(1, 2, 1, 5).fill = {
      //   type: 'pattern', // 模式
      //   pattern: 'solid', // 填充
      //   fgColor: {
      //     argb: '#a7ca52' // 背景色
      //   }
      // };

      // 4. 输出文件
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data]);
        saveAs(blob, 'multi-header.xlsx');
      });
    },
  },
}
</script>
