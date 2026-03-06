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
  constructor(private router: Router) { }
  currentDay: string = new Date().toISOString().substring(0, 10);
  surveyQuestion() {
    this.router.navigate(['admin-survey-question']);
  }
}
