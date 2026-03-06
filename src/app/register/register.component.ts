import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExampleService } from '../@services/example.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  userphone: string = '';
  age: number = 0;
  password: string = '';

  constructor(
    private exampleService: ExampleService,
    private router: Router,
    private apiService: ApiService
  ) {}

  register() {
    if (!this.name || !this.userphone || !this.password || this.age <= 18) {
  alert('請填寫完整資料，且年齡須大於 18');
  return;
}

  // 準備要送出的資料，格式必須和後端的 RegisterReq 一樣
  const registerData = {
    userphone: this.userphone,
    name: this.name,
    age: this.age,
    password: this.password
  };

  // 呼叫後端註冊 API
  this.apiService.postApi('register', registerData).subscribe({
    next: (res) => {
      // res 就是後端回傳的 BasicRes 物件
      if (res.code === 200) {  // 假設成功代碼是 "200"（需根據你的 ReplyMessage.SUCCESS 確認）
        alert('註冊成功！');
        this.router.navigateByUrl('/');  // 導向登入頁（假設首頁是登入頁）
      } else {
        alert('註冊失敗：' + res.message);
      }
    },
    error: (err) => {
      console.error('API 錯誤', err);
      alert('發生意外錯誤，請稍後再試');
    }
  });
}

  goToLogin() {
    this.router.navigateByUrl('/');
  }
}
