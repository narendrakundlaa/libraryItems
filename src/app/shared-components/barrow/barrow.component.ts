import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BookService } from 'src/app/book.service';

import { ActivatedRoute, Router } from '@angular/router';
import { BooksList } from 'src/app/models/listBooks.model';

@Component({
  selector: 'app-barrow',
  templateUrl: './barrow.component.html',
  styleUrls: ['./barrow.component.css']
})
export class BarrowComponent implements OnInit {
  barrowBooksForm: FormGroup;
  books: BooksList;
  data: any;

  alertType: string;
  displayAlert: boolean = false;
  alertMessage: string;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.barrowBooksForm = this.formBuilder.group({
      bookId: ['', [Validators.required]],
      bookName: ['', [Validators.required]],
      authorName: ['', [Validators.required]],
      fromdate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      status: ['', [Validators.required]],
      bookStatus: ['', [Validators.required]],
      count: ['', [Validators.required]]
    });
    const getBarrowID = localStorage.getItem('BookID');
    const getUserId = localStorage.getItem('userId');
    this.barrowBooksForm.patchValue({
      userId: getUserId,
      bookId: getBarrowID
    });


    this.route.paramMap.subscribe(params => {
      const bookId = +params.get('id');
      if (bookId) {
        this.getBook(bookId);
      } else {
        this.books = {
          id: null,
          bookId: 0,
          bookName: '',
          authorName: '',
          fromdate: null,
          endDate: null,
          genre: '',
          status: '',
          bookStatus: '',
          count: 0
        };
      }
    });
  }

  getBook(id: number) {
    this.bookService.getListOfBooksById(id)
      .subscribe(
        (book: BooksList) => {
          this.books = book;
          this.editBook(book);
        },
        (err: any) => console.log(err)
      );
  }

  editBook(book: BooksList) {
    this.barrowBooksForm.patchValue({
      bookId: book.bookId,
      bookName: book.bookName,
      authorName: book.authorName,
      fromdate: book.fromdate,
      endDate: book.endDate,
      genre: book.genre,
      status: book.status,
      bookStatus: book.bookStatus,
      count: book.count,
    });
  }
  barrowBook() {
    this.barrowBooksForm.patchValue({
      bookStatus: 'not available'
    });
    this.mapFormValuesToBookModel();
    this.updateBooks();
    this.borrowedBooksORAdd();

  }
  updateBooks() {
    this.bookService.updateBarrowBookBookList(this.books).subscribe((data: any) => {
      this.alertType = 'success';
      this.displayAlert = true;
      this.alertMessage = `Thanks..!  ${this.books.bookName} `;
      // tslint:disable-next-line:no-unused-expression
      (err: any) => console.log(err);
    });
  }
  borrowedBooksORAdd() {
    this.bookService.barrowedBook(this.barrowBooksForm.value).subscribe(borrowedBooks => {
      if (borrowedBooks) {
        this.alertType = 'success';
        this.displayAlert = true;
        this.alertMessage = `Thanks  ${this.barrowBooksForm.controls.bookName.value} `;
      }
    });
  }
  mapFormValuesToBookModel() {
    this.books = Object.assign({}, this.books, this.barrowBooksForm.value);
  }

  closeAlert() {
    this.displayAlert = false;
    this.router.navigate(['list']);
  }

  get f() { return this.barrowBooksForm.controls; }
}
