import { ExampleService } from './../@services/example.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule,RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
// log-in.component.ts
export class LogInComponent {
  userphone!: string;
  password!: string;

  constructor(
    private router: Router,
    private exampleService: ExampleService,
    private apiService: ApiService // 👈 1. 注入 API 服務
  ) {}

  goToRegister() {
    this.router.navigateByUrl("/register");
  }

  login() {
  const loginData = {
    userphone: this.userphone,
    password: this.password,
    name: this.exampleService.name
  };

  this.apiService.postApi('login', loginData).subscribe({
    next: (res: any) => {   // 如果你定義了 LoginRes，可以用 LoginRes 取代 any
      if (res.code === 200) {
        alert('登入成功！');

        // 儲存使用者資訊到 Service
        this.exampleService.userphone = this.userphone;
        this.exampleService.isAdmin = res.admin;
        this.exampleService.name = res.name;  // 從後端取得管理員狀態

        // 根據管理員狀態導向
        if (res.admin) {
          this.router.navigateByUrl("/admin");
        } else {
          this.router.navigateByUrl("/home");
        }
      } else {
        alert('登入失敗：' + res.message);
      }
    },
    error: (err) => {
      console.error('網路或伺服器錯誤', err);
      alert('系統發生錯誤，請稍後再試');
    }
  });
}
}
