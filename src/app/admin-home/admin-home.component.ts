// 從 Angular 核心庫中引入基本的組件、屬性裝飾器、生命週期鉤子和依賴注入工具
import { Component, ViewChild, AfterViewInit, inject, OnInit } from '@angular/core';
// 引入路由出口，用來顯示不同頁面的內容
import { RouterOutlet } from '@angular/router';
// 引入 Angular Material 的表格模組
import { MatTableModule } from '@angular/material/table';
// 引入表格專用的資料來源處理器
import { MatTableDataSource } from '@angular/material/table';
// 引入排序相關的模組與工具
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
// 引入無障礙輔助工具，用來「唸出」目前的排序狀態給視障人士聽
import { LiveAnnouncer } from '@angular/cdk/a11y';
// 引入表單模組，處理輸入框的資料綁定
import { FormsModule } from '@angular/forms';
// 引入日期選擇器（日曆）模組
import { MatDatepickerModule } from '@angular/material/datepicker';
// 引入表單欄位包裝器（Material 設計風格的輸入框外框）
import { MatFormFieldModule } from '@angular/material/form-field';
// 引入基本的文字輸入框模組
import { MatInputModule } from '@angular/material/input';
// 引入原生日期轉接器，讓日期選擇器能處理標準 JavaScript 日期物件
import { provideNativeDateAdapter } from '@angular/material/core';
// 引入導頁、連結相關模組
import { RouterModule } from '@angular/router';
// 引入彈出視窗（對話框）模組
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// 引入分頁器模組
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// 引入 service
import { ExampleService } from '../@services/example.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';  // 記得 import

@Component({
  selector: 'app-root', // 這個元件在 HTML 裡的標籤名稱
  imports: [ // 告訴 Angular 這個頁面會用到哪些工具
    RouterOutlet, MatTableModule, MatSortModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    RouterModule, MatDialogModule, MatPaginatorModule,
  ],
  providers: [provideNativeDateAdapter()], // 提供日期格式的支援
  templateUrl: './admin-home.component.html',   // 指定對應的 HTML 檔案
  styleUrl: './admin-home.component.scss'       // 指定對應的 CSS 樣式
})
export class AdminComponent implements OnInit, AfterViewInit {  // 加上 AfterViewInit
  memberTel!: string;
  passWord!: string;

  // 注入彈出視窗服務，未來可以用來開新視窗
  private dialog = inject(MatDialog);

  // 定義要在表格中顯示哪些欄位（順序依照陣列排列）
  displayedColumns: string[] = ['position', 'name', 'status', 'startTime', 'endTime', 'result', 'actions'];

  // 注入語音播報員服務（用於無障礙）
  private _liveAnnouncer = inject(LiveAnnouncer);

  // 建立表格的資料來源，初始為空陣列（之後會從 API 載入）
  dataSource = new MatTableDataSource<PeriodicElement>([]);  // 改為空陣列

  // 透過 ViewChild 取得 HTML 裡的排序零件與分頁零件
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private exampleService: ExampleService,
    private router: Router,
    private apiService: ApiService   // 注入 ApiService
  ) {
    this.memberTel = this.exampleService.userphone;
  }

  ngOnInit(): void {
    this.loadQuizzes();   // 一進入頁面就載入問卷資料
  }

  // 載入問卷資料的方法
  loadQuizzes() {
    this.apiService.getApi('quiz/getAll').subscribe({
      next: (res) => {
        console.log('後端回傳的資料：', res);  // 先看資料長怎樣
        if (res.code === 200) {
          // 把後端的 quizList 轉成表格需要的 PeriodicElement 陣列
          const quizList = res.quizList.map((quiz: any) => ({
            position: quiz.quizId,
            name: quiz.title,
            status: quiz.published ? '已發布' : '未發布',   // 簡單轉換，可依實際需求調整
            startTime: quiz.startDate,
            endTime: quiz.endDate,
            result: '前往'   // 暫時固定為「前往」
          }));
          this.dataSource.data = quizList;   // 更新表格資料
        } else {
          alert('取得問卷失敗：' + res.message);
        }
      },
      error: (err) => {
        console.error('API 錯誤', err);
        alert('伺服器發生錯誤，請稍後再試');
      }
    });
  }

  // --- 日期範圍篩選功能 ---
  applyDateFilter(start: string, end: string) {
    // 將字串轉為數字時間戳記，如果沒填就設為 0 或無限大
    const startTime = start ? new Date(start).getTime() : 0;
    const endTime = end ? new Date(end).getTime() : Infinity;

    // 定義表格的「過濾規則」
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      const dataTime = new Date(data.startTime).getTime();
      return dataTime >= startTime && dataTime <= endTime;
    };

    // 隨機給一個值觸發表格重新檢查過濾
    this.dataSource.filter = '' + Math.random();
  }

  /**
   * --- 刪除問卷功能 ---
   * @param element 點擊的那一列問卷資料物件
   */
  deleteElement(element: PeriodicElement) {
    if (confirm(`確定要刪除「${element.name}」嗎？這項操作無法復原。`)) {
      const deleteReq = { quizIdList: [element.position] };   // 組合成後端需要的格式

      this.apiService.postApi('quiz/delete', deleteReq).subscribe({
        next: (res) => {
          if (res.code === 200) {
            alert('刪除成功！');
            this.loadQuizzes();   // 重新載入列表，更新畫面
          } else {
            alert('刪除失敗：' + res.message);
          }
        },
        error: (err) => {
          console.error(err);
          alert('伺服器錯誤');
        }
      });
    }
  }

  addNewSurvey() {
    this.router.navigate(['/admin-survey-detail']);
  }

  // 當畫面初始化完成後執行
  ngAfterViewInit() {
    // 將排序功能與分頁功能連結到資料來源上
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // 把分頁器的標籤改成繁體中文
    this.paginator._intl.itemsPerPageLabel = '每頁顯示數量：';
    this.paginator._intl.nextPageLabel = '下一頁';
    this.paginator._intl.previousPageLabel = '上一頁';
  }

  // 當使用者點擊欄位標題排序時，在後台印出訊息
  announceSortChange(sortState: any): void {
    if (sortState.direction) {
      console.log(`目前排序：${sortState.direction} 欄位：${sortState.active}`);
    } else {
      console.log('清除排序');
    }
  }

  // --- 文字搜尋功能 ---
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

// 定義資料的「規格」，這是一張問卷資料必須具備的欄位
export interface PeriodicElement {
  name: string;
  position: number;
  status: string;
  result: string;
  startTime: string;
  endTime: string;
}

// 原本的假資料現在用不到了，可以移除或保留作為備用
// const ELEMENT_DATA: PeriodicElement[] = [ ... ];
