import { ExampleService } from './../@services/example.service';
import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
// DatePipe: 格式化日期顯示的工具 (例如把日期轉成 2025-01-01)
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-survey-detail',
  imports: [DatePipe, FormsModule,],
  templateUrl: './admin-survey-detail.component.html',
  styleUrl: './admin-survey-detail.component.scss'
})
export class AdminSurveyDetailComponent {
  // 1. 宣告所有在 HTML 綁定的變數
  quiztitle: string = '';
  description: string = '';
  startDay: string = new Date().toISOString().substring(0, 10);
  endDay: string = '';
  savedQuestions: any[] = []; // 如果這一頁還沒有題目，先給空陣列

  // 2. 在建構子注入 Service
  constructor(
    private router: Router,
    private apiService: ApiService,     // 修正名稱大小寫，注入 ApiService
    private exampleService: ExampleService // 注入 ExampleService
  ) { }

  surveyQuestion() {
  // 儲存當前表單資料到 service
  this.exampleService.quiztitle = this.quiztitle;
  this.exampleService.description = this.description;
  this.exampleService.startDay = this.startDay;
  this.exampleService.endDay = this.endDay;
  // 然後才導航
  this.router.navigate(['admin-survey-question']);
  }
}
