import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-survey-question',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-survey-question.component.html',
  styleUrl: './admin-survey-question.component.scss'
})
export class AdminSurveyQuestionComponent {
  selectedType: string ='';

  questionTitle: string ='';

  // 用來儲存所有的選項內容
  options: string[] = ['選項 1', '選項 2'];

  // 新增選項的方法
  addOption() {
    this.options.push(`選項 ${this.options.length + 1}`);
  }

  // 刪除特定索引的選項
  removeOption(index: number) {
    this.options.splice(index, 1);
  }
  // 1. 建立一個陣列來儲存「已經存好」的題目
  savedQuestions: any[] = [];

  // 2. 儲存按鈕點擊後的邏輯
  saveQuestion() {
    if (!this.questionTitle) {
      alert("請輸入題目名稱！");
      return;
    }

    // 將目前的題目資訊組成一個物件
    const newQuestion = {
      title: this.questionTitle,
      type: this.selectedType,
      // 使用 [...this.options] 是為了「複製」一份陣列，避免之後改動編輯區影響到已存好的內容
      options: [...this.options]
    };

    // 存入清單
    this.savedQuestions.push(newQuestion);

    // (選做) 清空輸入區，方便下一題輸入
    this.resetForm();
  }

  resetForm() {
    this.questionTitle = '';
    this.options = ['選項 1', '選項 2'];
  }
}
