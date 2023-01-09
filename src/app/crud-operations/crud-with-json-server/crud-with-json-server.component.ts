import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-with-json-server',
  templateUrl: './crud-with-json-server.component.html',
  styleUrls: ['./crud-with-json-server.component.scss']
})

export class CrudWithJsonServerComponent implements OnInit {
  formValue: FormGroup;
  data: any;
  row: any;
  submit: boolean;

  constructor(public fb: FormBuilder, public api: ApiService) {
    this.getStudent();
  }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      id: [''],
      image: [''],
      Fname: [''],
      Lname: [''],
      standard: [''],
      class: ['']
    });
  }

  convertImage(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => this.api.preview = reader.result;
    setTimeout(() => this.api.preview = this.api.preview, 200);
  }

  clearForm() {
    let close = document.getElementById('cancel');
    close?.click();
    this.formValue.reset();
    this.api.preview = '';
    (<HTMLInputElement>document.getElementById('inp')).value = '';
    this.getStudent();
  }

  getStudent() {
    this.api.getData()
      .subscribe((res: any) => { this.data = res });
  }

  addStudent() {
    // this.formValue.value.id = ''
    this.formValue.controls['id'].patchValue('');
    this.formValue.controls['image'].setValue(this.api.preview);
    this.api.postData(this.formValue.value)
      .subscribe(() => {
        this.clearForm();
        setTimeout(() => alert('Data Submited successfully'), 200);
      }    // ,()=>{alert('something went Wrong')}
      )
  }

  deleteData(item: any) {
    if (confirm('Are You Sure, You want to delete data at id: ' + item.id))
      this.api.deleteData(item.id)
        .subscribe(() => { this.getStudent() });
  }

  updateData(item: any) {
    this.row = item;
    this.submit = false;
    this.api.preview = this.row.image;
    this.formValue.setValue(item);
  }

  submitUpdate() {
    this.formValue.controls['image'].setValue(this.api.preview);
    this.api.updateData(this.formValue.value, this.row.id)
      .subscribe(() => {
        this.clearForm();
        setTimeout(() => alert('Data updated successfully.'), 200);
      });
  }
}
