import { Emp } from './../emp.model';
import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss'],
})
export class EmpFormComponent implements OnInit, AfterViewChecked {
  lstorage: any;
  countries: any;
  cities: any;
  imageToBase64: any;
  setState:any;
  setCity:any;

  @ViewChild('em') form: NgForm;

  constructor(public emp: Emp) {
    this.countries = [
      { country: 'Canada', states: ['calgary', 'ontario', 'toronto'] },
      { country: 'India', states: ['Gujarat', 'Mumbai', 'Delhi'] },
      { country: 'UK', states: ['London', 'Lesister', 'Bermingham'] },
    ];
    this.cities = [
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
    this.lstorage = JSON.parse(localStorage.getItem('employee')!);
    if (!this.lstorage) localStorage.setItem('employee', JSON.stringify([]));
  }
  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.lstorage = JSON.parse(localStorage.getItem('employee')!);
  }

  saveImage(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => (this.imageToBase64 = reader.result);
    setTimeout(() => (this.emp.preview = this.imageToBase64), 1000);
  }

  selectCountry(event: any) {
    for (let i in this.countries) {
      if (this.countries[i].country === event.target.value)
        this.setState = this.countries[i].states;
    } // this.states =  this.countries.find((con:any)=> con.name == event.target.value).states   //error
  }

  initState(){
    this.emp.setState = this.setState;
    this.emp.setCity = this.setCity;
  }

  selectCity(event: any) {
    for (let i in this.cities) {
      if (this.cities[i].state === event.target.value)
        this.setCity = this.cities[i].cities;
    }
  }

  onSubmit(emp: any) {
    // emp.image = emp.image? emp.image.split('\\').pop() : undefined  ;
    // emp.country = typeof emp.country == 'string' ? emp.country : '';
    // emp.state = typeof emp.state == 'string' ? emp.state : '';
    // emp.city = typeof emp.city == 'string' ? emp.city : '';
    this.lstorage = JSON.parse(localStorage.getItem('employee')!);
    emp.image = this.imageToBase64;
    if (this.emp.btn === 'Update') {
      this.lstorage[this.emp.id] = emp;
    } else if (this.emp.btn === 'Add Employee') {
      this.lstorage.push(emp);
    }
    localStorage.setItem('employee', JSON.stringify(this.lstorage));
    this.emp.toggle = false;
    this.form.reset();
  }
}
