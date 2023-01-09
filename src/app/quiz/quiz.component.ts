import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  form: FormGroup;
  formLogin: FormGroup;
  lstorage: any;
  login: boolean = true;
  dashboard: boolean = false;
  question: any;
  id: number = 0;
  scoreArray: any = [];
  answerArray: any = [];
  result: boolean = false;
  next: boolean = false;
  radioId: string;
  timer: any;
  totalScore: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.minLength(8), Validators.email]],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
    this.formLogin = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getQuestions().subscribe(res => this.question = res);
    this.lstorage = JSON.parse(localStorage.getItem('userQuiz')!);
    !this.lstorage ? localStorage.setItem('userQuiz', JSON.stringify([])) : null;
  }

  ngOnInit(): void { }

  getQuestions():Observable<any>{
    return this.http.get('./assets/question.json');
  }

  userIdeltimeOut(){
    if (this.dashboard){
      this.timer = setTimeout(() => {
        this.dashboard = false;
        this.id = 0;
        this.scoreArray = 0;
        this.next = false;
        this.result = false;
      }, 300*1000);
    }
  }

  @HostListener('window:keypress')
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.timer);
    this.userIdeltimeOut();
  }
  
  register(registerUser: any) {
    this.lstorage = JSON.parse(localStorage.getItem('userQuiz')!);
    for (let i of this.lstorage) {
      if (i.email == registerUser.email) {
        alert('email already exist!');
        return;
      }
    }
    this.login = true;
    this.lstorage.push(registerUser);
    localStorage.setItem('userQuiz', JSON.stringify(this.lstorage));
  }

  Login(loginResult: any) {
    this.lstorage = JSON.parse(localStorage.getItem('userQuiz')!);
    for (let i of this.lstorage) {
      if (
        i.password == loginResult.password &&
        i.name == loginResult.userName
      ) {
        alert('Login Successful!');
        this.dashboard = true;
        return;
      }
    }
    alert('Enter valid username or password!');
    // this.lstorage.forEach((element:any) => {
    //   if (element.password == loginResult.password && element.name == loginResult.userName) alert('Login Successful!')
    //   else if(!element) alert('Enter valid username or password!');
    // });
  }

  optionSelected(event: any) {
    let ans = this.radioId = event.target.value;
    let q = this.question.question[this.id];
    if (q.answer == ans && this.scoreArray.length == this.id) {
      this.scoreArray.push(1);
      this.answerArray.push(this.radioId);
    } 
    else if(this.scoreArray.length == this.id && q.answer !== ans) {
        this.scoreArray.push(0);
        this.answerArray.push(this.radioId);
      }
      else {
        if (q.answer == ans){
          this.scoreArray[this.id] = 1;
        }
        else {
          this.scoreArray[this.id] = 0;
        }
        this.answerArray[this.id] = this.radioId;
      }
    this.next = true;
  }

  nextQuestion() {
    this.id += 1;
    if(this.answerArray[this.id]){
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById(this.answerArray[this.id])).checked = true;
      }, 0);
    }
    else {
      setTimeout(() => {
        this.next = !this.next;
        (<HTMLInputElement>document.getElementById(this.radioId)).checked = false;
      }, 0);
    }
  }

  previousQues(){
    this.id -= 1;
    this.next = true;    
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById(this.answerArray[this.id])).checked = true;
    }, 0);
    // Promise.resolve().then(()=>(<HTMLInputElement>document.getElementById(this.answerArray[this.id])).checked = true) // not working but can be implement in other cases
  }

  finish(){
    this.question.question.length == this.scoreArray.length ? 
    this.totalScore = this.scoreArray.reduce((x:any, y:any)=> {return x + y}) 
    : this.totalScore;
    this.result = !this.result;
  }

  quizEnd() {
    this.next = false;
    this.result = !this.result;
    this.id = 0;
    this.scoreArray = [];
    this.answerArray = [];
  }
}

