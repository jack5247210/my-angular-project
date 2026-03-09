import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExampleService } from '../@services/example.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-survey-question',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-survey-question.component.html',
  styleUrl: './admin-survey-question.component.scss'
})
export class AdminSurveyQuestionComponent {
  trackByIndex(index: number, item: any) {
  return index;
}
  quiztitle!: string;
  description!: string;
  startDay!: string;
  endDay!: string;
  selectedType: string ='';
  questionTitle: string ='';
  question: any;
  required: boolean = false;

  constructor(
  private exampleService: ExampleService,
  private apiService: ApiService,
  private router: Router
) { }

  ngOnInit() {
  this.quiztitle = this.exampleService.quiztitle;
  this.description = this.exampleService.description;
  this.startDay = this.exampleService.startDay;
  this.endDay = this.exampleService.endDay;
}

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
    if (!this.question) {
      alert("請輸入題目名稱！");
      return;
    }



    // 將目前的題目資訊組成一個物件
    const newQuestion = {
      questionId: this.savedQuestions.length + 1,  // 自動產生題號
      question: this.question,
      type: this.selectedType,
      required: this.required,
      // 使用 [...this.options] 是為了「複製」一份陣列，避免之後改動編輯區影響到已存好的內容
      options: [...this.options]// 保持陣列，最後再轉字串
    };

    // 存入清單
    this.savedQuestions.push(newQuestion);

    // (選做) 清空輸入區，方便下一題輸入
    this.resetForm();

  }

  resetForm() {
    this.question = '';
    this.options = ['選項 1', '選項 2'];

  }



  finalCreate() {
  const formattedQuestions = this.savedQuestions.map((q, index) => ({
  questionId: index + 1,
  question: q.question,
  type: q.type,
  required: q.required,
  options: q.options.join(',')
}));

const finalData = {
  title: this.exampleService.quiztitle,
  description: this.exampleService.description,
  startDate: this.exampleService.startDay,
  endDate: this.exampleService.endDay,
  published: false,
  questionList: formattedQuestions
};

  this.apiService.postApi('quiz/create', finalData).subscribe({
  next: (res: any) => {
    if(res.code === 200) {
      alert('全卷儲存成功！');
      this.router.navigate(['admin']);
    } else {
      alert('儲存失敗：' + res.message);
    }
  },
  error: (err) => {
    console.error('API 錯誤', err);
    alert('伺服器連線失敗，請稍後再試');
  }
});

// 然後才導航
this.router.navigate(['admin']);
}

}
