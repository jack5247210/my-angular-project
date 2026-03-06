import { RegisterComponent } from './register/register.component';
import { Component } from '@angular/core';
// 從 Angular 路由庫中引入 Routes 型別定義，確保我們寫的路徑格式正確
import { Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
// 引入首頁元件 (homeComponent)
// ./home/home.component 代表檔案放在目前資料夾下的 home 子資料夾內
import { homeComponent } from './home/home.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminComponent } from './admin-home/admin-home.component';
import { AdminSurveyDetailComponent } from './admin-survey-detail/admin-survey-detail.component';
import { AdminSurveyQuestionComponent } from './admin-survey-question/admin-survey-question.component';

// *** 關鍵：必須 import 這個元件 ***

// 定義一個名為 routes 的常數，型別是 Routes 陣列
export const routes: Routes = [

  { path: 'admin', component: AdminComponent }, // 確保管理員模式這行存在

  { path: '',component: LogInComponent },
  // 空值是首頁
  { path: 'chart', component: ChartComponent },
  // 第一條路線：空路徑 (首頁)
  // 當使用者打開網站 (例如 http://localhost:4200/)，沒有輸入任何路徑時
  // 直接顯示 homeComponent
  { path: 'home', component: homeComponent },

  // 第二條路線：問卷詳情頁 (動態路由)
  {
    // path: 'survey/:id'
    // 'survey/' 是固定路徑
    // ':id' 是一個「變數占位符」，冒號代表 id 是動態的
    // 例如網址是 survey/1 或 survey/100，都會走到這條路線
    path: 'survey/:id',

    // loadComponent：延遲載入 (Lazy Loading)
    // 這是進階技巧：只有當使用者真的點進這個頁面時，瀏覽器才會下載這個元件的程式碼
    // () => import(...)：去指定的路徑尋找檔案
    // .then(m => m.SurveyDetailComponent)：找到檔案後，取出裡面的 SurveyDetailComponent 元件來顯示
    loadComponent: () => import('./survey-detail/survey-detail.component').then(m => m.SurveyDetailComponent)
  },
  { path: 'admin-survey-detail', component: AdminSurveyDetailComponent },
  { path: 'admin-survey-question', component: AdminSurveyQuestionComponent },
  { path: 'register', component: RegisterComponent },
];
