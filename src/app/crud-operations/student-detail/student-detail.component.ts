import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent
  implements OnInit, OnChanges, AfterViewChecked, AfterViewInit
{
  toggle: boolean = false;
  country: Array<any>;
  city: Array<any>;
  stateTemp: any;
  cityTemp: any;
  setState: any;
  setCity: any;
  form: FormGroup;
  favSubjectForm: FormGroup;
  lstorage: any;
  btn: boolean;
  dataSource: MatTableDataSource<any>;
  storage: boolean = true;
  displayedColumns: string[];
  id: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder) {
    this.country = [
      { country: 'Canada', states: ['calgary', 'ontario', 'toronto'] },
      { country: 'India', states: ['Gujarat', 'Mumbai', 'Delhi'] },
      { country: 'UK', states: ['London', 'Lesister', 'Bermingham'] },
    ];
    this.city = [
      { state: 'calgary', cities: ['cal', 'cal-1', 'cal-2'] },
      { state: 'ontario', cities: ['ont', 'ont-1', 'ont-2'] },
      { state: 'toronto', cities: ['tor', 'tor-1', 'tor-2'] },
      { state: 'Gujarat', cities: ['guj', 'guj-1', 'guj-2'] },
      { state: 'Mumbai', cities: ['mum', 'mum-1', 'mum-2'] },
      { state: 'Delhi', cities: ['del', 'del-1', 'del-2'] },
      { state: 'London', cities: ['lon', 'lon-1', 'lon-2'] },
      { state: 'Lesister', cities: ['les', 'les-1', 'les-2'] },
      { state: 'Bermingham', cities: ['ber', 'ber-1', 'ber-2'] },
    ];
    this.lstorage = JSON.parse(localStorage.getItem('studentDetail')!);
    this.dataSource = new MatTableDataSource(this.lstorage);
    this.displayedColumns = [
      'fullName',
      'class',
      'favSubject',
      'address',
      'rank',
      'action',
    ];
    !this.lstorage
      ? localStorage.setItem('studentDetail', JSON.stringify([]))
      : null;
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {
    this.lstorage = JSON.parse(localStorage.getItem('studentDetail')!);
    if (this.storage && this.lstorage) {
      this.dataSource = new MatTableDataSource(this.lstorage);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.storage = false;
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      class: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      rank: ['', Validators.required],
    });
    this.favSubjectForm = this.fb.group({
      maths: false,
      history: false,
      computer: false,
      drawing: false,
      science: false,
    });
  }

  selectState(event: any) {
    for (let i in this.country) {
      if (this.country[i].country === event.target.value) {
        this.stateTemp = this.country[i].states;
      }
    }
  }

  initState(){
    this.setState = this.stateTemp;
    this.setCity = this.cityTemp;
  }

  selectCity(event: any) {    
    for (let i in this.city) {
      if (this.city[i].state === event.target.value) {
        this.cityTemp = this.city[i].cities;
      }
    }
  }

  filterTable(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  onSubmit(form: any, favSub: any) {
    let favSubData = { favSubjects: [favSub] };
    let fSub: any = [];
    favSub.maths ? fSub.push('Maths') : fSub;
    favSub.history ? fSub.push('History') : fSub;
    favSub.computer ? fSub.push('Computer') : fSub;
    favSub.drawing ? fSub.push('Drawing') : fSub;
    favSub.science ? fSub.push('Science') : fSub;
    let SubjectArray = { favSubject: fSub };

    this.lstorage = JSON.parse(localStorage.getItem('studentDetail')!);
    if (this.btn) {
      this.lstorage.push({ ...form, ...SubjectArray, ...favSubData }); //Merge objects using the spread operator (...)
      this.btn = false;
    } else if (!this.btn) {
      let obj: any = Object.assign(this.form.value, SubjectArray, favSubData); //Merge objects using Object.assign() method
      this.lstorage[this.id] = obj;
    }
    localStorage.setItem('studentDetail', JSON.stringify(this.lstorage));
    this.toggle = false;
    this.favSubjectForm.reset()
    this.form.reset();
    this.storage = true;
  }

  delete(i: number) {
    if (confirm('are you sure, You want to delete item at row ' + (i + 1))) {
      this.lstorage = JSON.parse(localStorage.getItem('studentDetail')!);
      this.lstorage.splice(i, 1);
      localStorage.setItem('studentDetail', JSON.stringify(this.lstorage));
      this.storage = true;
    }
  }

  update(i: number, item: any) {
    let row = JSON.parse(JSON.stringify(item))
    // let row = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    row.country = '';
    row.state = '';
    row.city = '';
    this.id = i;
    this.btn = false;
    this.toggle = true;
    this.favSubjectForm.setValue(row.favSubjects[0]);
    delete row.favSubject;
    delete row.favSubjects;
    this.form.setValue(row);
  }
}
