import { ApiService } from './api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  form: FormGroup;
  formJs: FormGroup;
  toggle: boolean = false;
  toggleJs: boolean = false;
  lstorage: any = [];
  addItem: boolean;
  addItemJs: boolean;
  id: number;
  item: any = [];
  grand: number = 0;
  grandJs: number = 0;
  ls: boolean = true;
  record: any;
  itemJs: any;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.lstorage = JSON.parse(localStorage.getItem('products')!);
    !this.lstorage ? localStorage.setItem('products', JSON.stringify([])) : null;
    if (this.lstorage.length > 0) {
      for (let i of this.lstorage) {
        this.grand += i.price * i.quantity;
      }
    }
    this.getData();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.formJs = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  openForm() {
    this.toggle = !this.toggle;
    this.addItem = true;
  }

  AddProduct() {
    this.lstorage.push(this.form.value);
    localStorage.setItem('products', JSON.stringify(this.lstorage));
    this.toggle = false;
    this.grand += this.form.value.price * this.form.value.quantity;
    this.form.reset();
  }

  deleteItem(i: number) {
    if (confirm("are you sure you want to delete item at " + i)) {
      this.grand -= this.lstorage[i].price * this.lstorage[i].quantity;
      this.lstorage.splice(i, 1);
      localStorage.setItem('products', JSON.stringify(this.lstorage));
    }
  }

  updateItem(i: number, item: any) {
    this.toggle = true;
    this.addItem = false;
    this.form.setValue(item);
    this.id = i;
    this.item = item;
  }

  updateitem() {
    this.grand -= this.item.price * this.item.quantity;
    this.lstorage = JSON.parse(localStorage.getItem('products')!);
    this.lstorage[this.id] = this.form.value;
    localStorage.setItem('products', JSON.stringify(this.lstorage));
    this.addItem = true;
    this.toggle = false;
    this.grand += this.form.value.price * this.form.value.quantity;
    this.form.reset();
  }

  radioLs() {
    this.ls = !this.ls;
    this.toggleJs ? this.toggleJs = false : null;
  }

  radioJs() {
    this.ls = !this.ls;
    this.toggle ? this.toggle = false : null;
  }

  openFormJs() {
    this.toggleJs = !this.toggleJs;
    this.addItemJs = true;
  }

  getData() {
    this.api.get().subscribe((res: any) => {
      this.record = res;
      if (this.grandJs == 0 && this.record.length > 0) {
        for (let i of this.record) {
          this.grandJs += i.price * i.quantity;
        }
      }
    });
  }

  AddProductJs() {
    this.api.post(this.formJs.value).subscribe(() => {
      this.grandJs += this.formJs.value.price * this.formJs.value.quantity;
      this.toggleJs = false;
      this.formJs.reset();
      this.getData();
    });
  }

  deleteRecord(item: any) {
    if (confirm('Are You Sure, You want to delete data at id: ' + item.id)) {
      this.api.delete(item.id).subscribe(() => {
        this.grandJs -= item.price * item.quantity;
        this.getData();
      });
    }
  }

  updateRecord(item: any) {
    this.itemJs = item;
    this.addItemJs = false;
    this.toggleJs = true;
    this.formJs.setValue(item);
  }

  updateJs() {
    this.formJs.controls['id'].patchValue('');
    this.api.put(this.itemJs.id, this.formJs.value).subscribe(() => {
      this.grandJs -= this.itemJs.price * this.itemJs.quantity;
      this.grandJs += this.formJs.value.price * this.formJs.value.quantity;
      this.addItemJs = true;
      this.toggleJs = false;
      this.formJs.reset();
      this.getData();
    });
  }

}
