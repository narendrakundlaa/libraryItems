import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBooksForm: FormGroup;
  alertType: string;
  displayAlert: boolean = false;
  alertMessage: string;

  constructor(private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private router: Router, private bookService: BookService) { }

  // "bookId": 10,
  // "bookName": "Java 8 Features",
  // "authorName": "HCL Foundation",
  // "fromdate": "10/13/2020",
  // "endDate": "12/13/2020",
  // "genre": "Okay",
  // "status": "Okay",
  // "bookStatus": "available",
  // "count": 20
  ngOnInit() {
    this.addBooksForm = this.formBuilder.group({
      bookId: [''],
      bookName: ['', [Validators.required]],
      fromdate: ['10/13/2020'],
      endDate: ['10/13/2020'],
      status: ['okay'],
      bookStatus: ['available'],
      count: [''],
      authorName: ['', [Validators.required]],
      genre: ['okay']

    });
  }
  get f() { return this.addBooksForm.controls; }

  addBook() {
    console.log(this.addBooksForm.value);
    this.bookService.addBook(this.addBooksForm.value).subscribe((addBooked) => {
      if (addBooked) {
        this.alertType = 'success';
        this.displayAlert = true;
        this.alertMessage = `Thanks for donate ${this.addBooksForm.controls.bookName.value} `;
      }
    },
      (err: any) => console.log(err)
    );

  }
  closeAlert() {
    this.displayAlert = false;
    this.router.navigate(['list']);
  }

}
