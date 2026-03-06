import { ExampleService } from './../@services/example.service';
// Component: 元件核心, OnInit: 初始化的生命週期, inject: 注入服務的工具
import { Component, OnInit, inject } from '@angular/core';
// ActivatedRoute: 用來取得網址上的參數 (例如 survey/1 裡的 "1")
import { ActivatedRoute } from '@angular/router';
// MatCheckboxModule: Angular Material 的勾選框元件
import { MatCheckboxModule } from '@angular/material/checkbox';
// CommonModule: 包含常用指令 (如 *ngIf, *ngFor)
import { CommonModule } from '@angular/common';
// FormsModule: 讓 HTML 表單與 TS 資料能「雙向綁定」的關鍵
import { FormsModule } from '@angular/forms';
// DatePipe: 格式化日期顯示的工具 (例如把日期轉成 2025-01-01)
import { DatePipe } from '@angular/common';

import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-survey-detail', // 元件標籤
  imports: [MatCheckboxModule, CommonModule, FormsModule, DatePipe, MatRadioModule, MatRadioModule, MatCheckboxModule, FormsModule], // 載入工具
  templateUrl: './survey-detail.component.html',
  styleUrl: './survey-detail.component.scss'
})
export class SurveyDetailComponent implements OnInit {
  // 用來記錄目前下拉選單選中了哪一個圖表，預設顯示圓餅圖
  selectedChart: string = 'pie';
  // --- 基礎變數 ---
  currentDay: Date = new Date();     // 儲存今天日期 這一個變數就包含了日期與時間
  selectedOption: string = '';       // 儲存選擇題的選項
  isConfirmed: boolean = false;      // 勾選框：是否同意隱私條款
  surveyCount: number = 0;           // 數字輸入框：填寫次數

  // 注入網址工具，幫助我們知道現在是哪一份問卷
  private route = inject(ActivatedRoute);
  surveyId: string | null = '';      // 儲存從網址抓到的 ID

  // --- 模式切換 ---
  // false 代表「填寫中」，true 代表「預覽中」
  isPreview: boolean = false;


  constructor(private exampleService: ExampleService) {
    this.memberTel = this.exampleService.userphone;
  }



  memberTel!: string;
  passWord!: string;
  // --- 表單大物件 ---
  // 預先定義好所有欄位，這樣 HTML 才知道要把資料填到哪裡
  formData = {
    session: '',        // 用餐時段
    improvement: '',    // 需要改進的地方
    feedback: '',       // 其他意見
    willReturn: '',     // 是否再次光臨
    willRecommend: '',  // 是否推薦他人
    bestDish: [
      {name:'松露紅酒慢燉和牛頰',checkbox: false},
      {name:'龍蝦濃湯卡布奇諾',checkbox: false},
      {name:'法式鵝肝慕斯佐無花果醬',checkbox: false},
      {name:'煙燻鮭魚塔塔佐魚子醬',checkbox: false},
      {name:'炙燒干貝佐松露奶油飯',checkbox: false},
      {name:'香煎龍利魚配白蘭地奶油醬',checkbox: false},
    ],       // 最愛菜色
    ratings: {          // 滿意度評分
      taste: '',        // 口味
      fresh: '',        // 新鮮度
      speed: '',        // 上菜速度
      clean: '',        // 清潔
      music: '',        // 音樂
      price: ''         // 價格
    }
  };

  // 在 SurveyDetailComponent 類別內
get selectedDishNames():string[] {
  // 找出所有 checkbox 為 true 的項目，並把名字抓出來
  return this.formData.bestDish
    .filter(item => item.checkbox)
    .map(item => item.name);
}

  // --- 生命週期：網頁一打開就執行 ---
  ngOnInit() {
    // 從網址路徑中取得名為 'id' 的參數
    // 例如網址是 /survey/10，那 surveyId 就會是 10
    this.surveyId = this.route.snapshot.paramMap.get('id');
  }

  // --- 功能函式 ---

  // 按下「預覽問卷」按鈕時執行  !!!!這裡要問老師
  goToPreview() {
    this.isPreview = true;   // 切換到預覽畫面
    window.scrollTo(0, 0);   // 自動捲動到最上方，讓使用者從頭看起
  }

  // 按下「返回修改」按鈕時執行
  backToEdit() {
    this.isPreview = false;  // 切換回編輯畫面
  }

  // 按下「確認送出」按鈕時執行
  submitSurvey() {
    // 實際上線時，這裡會寫 API 把資料傳送到資料庫
    console.log('送出的問卷資料：', this.formData);
    alert('問卷已成功送出，可憑此畫面向服務生折抵200元！');

  }

}
