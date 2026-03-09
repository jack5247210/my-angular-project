import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// 上面寫法告訴系統 這隻檔案共用
export class ExampleService {
  userphone!: string;
  password!: string;
  name!: string;
  age!: number;
  isAdmin: boolean = false;

  quiztitle!: string;
  description!: string;
  startDay!: string;
  endDay!: string;


  constructor() { }
}
