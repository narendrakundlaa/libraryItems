import { Component, OnInit } from '@angular/core';
import { BooksList } from 'src/app/models/listBooks.model';
import { BookService } from 'src/app/book.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  alertType: string;
  displayAlert: boolean = false;
  alertMessage: string;
  constructor(private http: HttpClient, private bookService: BookService, private router: Router) { }
  searchText: string;
  books: BooksList[];
  imgUrl: string;
  isLogin: boolean = false;
  ngOnInit() {

    // this.bookService.getListOfBooks().subscribe((books: any) => {

    //   this.books = books.bookResponse;
    //   console.log(books);
    // };

    this.bookService.getListOfBooks().subscribe((bookList) => {
      this.books = bookList;
    });
  }
  // getBookList(searchTextparm: string){
  //   console.log(searchTextparm);
  // }

  getBookList() {

    // search books when enter lenth is > 3
    // if (this.searchText.length > 3) {
    //   this.bookService.searchBooks(this.searchText).subscribe((books: any) => {

    //     this.books = books.bookResponse;
    //     console.log(books);
    //   }, // HttpErrorResponse
    //     (err: HttpErrorResponse) => {
    //       if (err) {
    //         this.alertType = 'warning';
    //         this.displayAlert = true;
    //         this.alertMessage = ` ${err.error.message} `;
    //       }
    //       console.log(err);
    //     });

    // }


  }

  borrow(id: number) {

    this.bookService.loginStautus.subscribe(data => {
      this.isLogin = data;
      if (this.isLogin) {
        this.router.navigate(['/editBorrow', id]);
      } else {
        this.alertType = 'warning';
        this.displayAlert = true;
        this.alertMessage = `Please login before borrow an item`;
      }
    });
  }
  request(id: number) {
    this.bookService.loginStautus.subscribe(data => {
      this.isLogin = data;
      if (this.isLogin) {
        this.router.navigate(['/editRequest', id]);
      } else {
        this.alertType = 'warning';
        this.displayAlert = true;
        this.alertMessage = `Please login before request an item`;
      }
    });
  }
  closeAlert() {
    this.displayAlert = false;
    this.router.navigate(['/login']);

  }
}
