import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// 必須註冊 Chart.js 的組件，圖表才會顯示
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule], // 注入圖表工具
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  selectedChart: string = 'pie';


  // 1. 設定圖表類型為圓餅圖 (Pie)
  public pieChartType: ChartType = 'pie';

  // 2. 設定圖表的資料內容 前面number是data 後面srt是lab
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['松露紅酒慢燉和牛頰', '龍蝦濃湯卡布奇諾', '法式鵝肝慕斯佐無花果醬', '煙燻鮭魚塔塔佐魚子醬','炙燒干貝佐松露奶油飯','香煎龍利魚配白蘭地奶油醬'], // 橫軸標籤
    datasets: [{
      data: [90, 85, 100, 50, 70, 67], // 這裡的數字代表填答的人數
      backgroundColor: ['#4caf50', '#2196f3', '#6b6635ff', '#f44336', ] // 各區塊顏色
    }]
  };

  // 3. 圖表的額外設定(interface)（如自動縮放）
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true, //讓圖表會跟著視窗大小自動縮放。
    plugins: {
      legend: {  //控制圖例（就是那個告訴你綠色是和牛、藍色是龍蝦的小方塊）。
        display: true,  //顯示圖例
        position: 'top', //把圖例放在圖表的上方。
      }
    }
  };
  // 1. 將類型更改為 'line' (折線圖)
  public lineChartType: ChartType = 'line';

  // 2. 設定折線圖的資料
  public lineChartData: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'], // 橫軸：通常是時間
    datasets: [
      {
        data: [65, 59, 80, 81], // 第一條線的數值（例如：滿意度評分）
        label: '餐點口味評價一分',       // 這條線的名字
        borderColor: '#3f51b5',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [67, 92, 50, 49], // 第一條線的數值（例如：滿意度評分）
        label: '餐點口味評價兩分',       // 這條線的名字
        borderColor: '#169855ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [45, 79, 60, 41], // 第一條線的數值（例如：滿意度評分）
        label: '餐點口味評價三分',       // 這條線的名字
        borderColor: '#8eb312ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 40, 27], // 第一條線的數值（例如：滿意度評分）
        label: '餐點口味評價四分',       // 這條線的名字
        borderColor: '#981682ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 90, 71], // 第一條線的數值（例如：滿意度評分）
        label: '餐點口味評價五分',       // 這條線的名字
        borderColor: '#b56617ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
    ]
  };

  // 1. 將類型更改為 'line' (折線圖)
  public lineChartType2: ChartType = 'line';

  // 2. 設定折線圖的資料
  public lineChartData2: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'], // 橫軸：通常是時間
    datasets: [
      {
        data: [65, 59, 80, 81], // 第一條線的數值（例如：滿意度評分）
        label: '食材新鮮評價一分',       // 這條線的名字
        borderColor: '#3f51b5',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [67, 92, 50, 49], // 第一條線的數值（例如：滿意度評分）
        label: '食材新鮮評價兩分',       // 這條線的名字
        borderColor: '#169855ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [45, 79, 60, 41], // 第一條線的數值（例如：滿意度評分）
        label: '食材新鮮評價三分',       // 這條線的名字
        borderColor: '#8eb312ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 40, 27], // 第一條線的數值（例如：滿意度評分）
        label: '食材新鮮評價四分',       // 這條線的名字
        borderColor: '#981682ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 90, 71], // 第一條線的數值（例如：滿意度評分）
        label: '食材新鮮評價五分',       // 這條線的名字
        borderColor: '#b56617ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
    ]
  };

  // 1. 將類型更改為 'line' (折線圖)
  public lineChartType3: ChartType = 'line';

  // 2. 設定折線圖的資料
  public lineChartData3: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'], // 橫軸：通常是時間
    datasets: [
      {
        data: [65, 59, 80, 81], // 第一條線的數值（例如：滿意度評分）
        label: '出餐速度評價一分',       // 這條線的名字
        borderColor: '#3f51b5',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [67, 92, 50, 49], // 第一條線的數值（例如：滿意度評分）
        label: '出餐速度評價兩分',       // 這條線的名字
        borderColor: '#169855ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [45, 79, 60, 41], // 第一條線的數值（例如：滿意度評分）
        label: '出餐速度評價三分',       // 這條線的名字
        borderColor: '#8eb312ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 40, 27], // 第一條線的數值（例如：滿意度評分）
        label: '出餐速度評價四分',       // 這條線的名字
        borderColor: '#981682ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 90, 71], // 第一條線的數值（例如：滿意度評分）
        label: '出餐速度評價五分',       // 這條線的名字
        borderColor: '#b56617ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
    ]
  };

  // 1. 將類型更改為 'line' (折線圖)
  public lineChartType4: ChartType = 'line';

  // 2. 設定折線圖的資料
  public lineChartData4: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'], // 橫軸：通常是時間
    datasets: [
      {
        data: [65, 59, 80, 81], // 第一條線的數值（例如：滿意度評分）
        label: '環境整潔評價一分',       // 這條線的名字
        borderColor: '#3f51b5',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [67, 92, 50, 49], // 第一條線的數值（例如：滿意度評分）
        label: '環境整潔評價兩分',       // 這條線的名字
        borderColor: '#169855ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [45, 79, 60, 41], // 第一條線的數值（例如：滿意度評分）
        label: '環境整潔評價三分',       // 這條線的名字
        borderColor: '#8eb312ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 40, 27], // 第一條線的數值（例如：滿意度評分）
        label: '環境整潔評價四分',       // 這條線的名字
        borderColor: '#981682ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 90, 71], // 第一條線的數值（例如：滿意度評分）
        label: '環境整潔評價五分',       // 這條線的名字
        borderColor: '#b56617ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
    ]
  };

  // 1. 將類型更改為 'line' (折線圖)
  public lineChartType5: ChartType = 'line';

  // 2. 設定折線圖的資料
  public lineChartData5: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'], // 橫軸：通常是時間
    datasets: [
      {
        data: [65, 59, 80, 81], // 第一條線的數值（例如：滿意度評分）
        label: '用餐氛圍評價一分',       // 這條線的名字
        borderColor: '#3f51b5',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [67, 92, 50, 49], // 第一條線的數值（例如：滿意度評分）
        label: '用餐氛圍評價兩分',       // 這條線的名字
        borderColor: '#169855ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [45, 79, 60, 41], // 第一條線的數值（例如：滿意度評分）
        label: '用餐氛圍評價三分',       // 這條線的名字
        borderColor: '#8eb312ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 40, 27], // 第一條線的數值（例如：滿意度評分）
        label: '用餐氛圍評價四分',       // 這條線的名字
        borderColor: '#981682ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 90, 71], // 第一條線的數值（例如：滿意度評分）
        label: '用餐氛圍評價五分',       // 這條線的名字
        borderColor: '#b56617ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
    ]
  };

  // 1. 將類型更改為 'line' (折線圖)
  public lineChartType6: ChartType = 'line';

  // 2. 設定折線圖的資料
  public lineChartData6: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'], // 橫軸：通常是時間
    datasets: [
      {
        data: [65, 59, 80, 81], // 第一條線的數值（例如：滿意度評分）
        label: '性價比評價一分',       // 這條線的名字
        borderColor: '#3f51b5',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [67, 92, 50, 49], // 第一條線的數值（例如：滿意度評分）
        label: '性價比評價兩分',       // 這條線的名字
        borderColor: '#169855ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [45, 79, 60, 41], // 第一條線的數值（例如：滿意度評分）
        label: '性價比評價三分',       // 這條線的名字
        borderColor: '#8eb312ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 40, 27], // 第一條線的數值（例如：滿意度評分）
        label: '性價比評價四分',       // 這條線的名字
        borderColor: '#981682ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
      {
        data: [75, 29, 90, 71], // 第一條線的數值（例如：滿意度評分）
        label: '性價比評價五分',       // 這條線的名字
        borderColor: '#b56617ff',        // 線條顏色
        backgroundColor: 'rgba(63, 81, 181, 0.2)', // 節點顏色與下方填充色
        fill: 'origin',                // 是否填充線條下方區域
        tension: 0.3                   // 線條的平滑度 (0 為直線，數值越大越彎曲)
      },
    ]
  };
  // 3. 設定折線圖的選項（例如：座標軸標題）
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        beginAtZero: true, // Y 軸從 0 開始
        title: { display: true, text: '數量 (份)' }
      },
      x: {
        title: { display: true, text: '季度' }
      }
    }
  };
  public lineChartOptions2: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        beginAtZero: true, // Y 軸從 0 開始
        title: { display: true, text: '數量 (份)' }
      },
      x: {
        title: { display: true, text: '季度' }
      }
    }
  };
  public lineChartOptions3: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        beginAtZero: true, // Y 軸從 0 開始
        title: { display: true, text: '數量 (份)' }
      },
      x: {
        title: { display: true, text: '季度' }
      }
    }
  };
  public lineChartOptions4: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        beginAtZero: true, // Y 軸從 0 開始
        title: { display: true, text: '數量 (份)' }
      },
      x: {
        title: { display: true, text: '季度' }
      }
    }
  };
  public lineChartOptions5: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        beginAtZero: true, // Y 軸從 0 開始
        title: { display: true, text: '數量 (份)' }
      },
      x: {
        title: { display: true, text: '季度' }
      }
    }
  };
  public lineChartOptions6: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        beginAtZero: true, // Y 軸從 0 開始
        title: { display: true, text: '數量 (份)' }
      },
      x: {
        title: { display: true, text: '季度' }
      }
    }
  };
}
