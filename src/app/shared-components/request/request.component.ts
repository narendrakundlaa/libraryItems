import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksList } from 'src/app/models/listBooks.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestBooksForm: FormGroup;

  alertType: string;
  displayAlert: boolean = false;
  alertMessage: string;

  books: BooksList;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router, private route: ActivatedRoute ) { }
  ngOnInit() {
    this.requestBooksForm = this.formBuilder.group({
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
    const barrowID = localStorage.getItem('BookID');
    const userId = localStorage.getItem('userId');
    this.requestBooksForm.patchValue({
      userId,
      bookId: barrowID
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
    this.requestBooksForm.patchValue({
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

  requestBook() {
    this.mapFormValuesToBookModel();
    this.bookService.requestBook(this.requestBooksForm.value).subscribe((data: any) => {

      // alert(data.message);
      this.alertType = 'success';
      this.displayAlert = true;
      this.alertMessage = ` ${data.bookName} `;

      // tslint:disable-next-line:no-unused-expression
      (err: any) => console.log(err);
      console.log(data);
    }
      // () => this.router.navigate(['list']),

    );
  }

  mapFormValuesToBookModel() {
    // this.books.bookId = this.requestBooksForm.value.bookId;
    // this.books.authorName = this.requestBooksForm.value.authorName;
    // this.books.bookName = this.requestBooksForm.value.bookName;
    // this.books.bookStatus = this.requestBooksForm.value.bookStatus;
    // this.books.endDate = this.requestBooksForm.value.endDate;
    // this.books.fromdate = this.requestBooksForm.value.fromdate;
    // this.books.genre = this.requestBooksForm.value.genre;
    // this.books.status = this.requestBooksForm.value.status;
    this.books = Object.assign({}, this.books, this.requestBooksForm.value);
  }

  closeAlert() {
    this.displayAlert = false;
    this.router.navigate(['list']);
  }

}
