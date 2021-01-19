import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BooksList } from 'src/app/models/listBooks.model';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  alertType: string;
  displayAlert: boolean = false;
  alertMessage: string;

  searchText: string;
  books: BooksList[];
  imgUrl: string;
  isLogin: boolean = false;
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.bookService.getBorrowedHistory().subscribe((data: any) => {
      console.log(data);
      this.books = data;

    },
      (err: HttpErrorResponse) => {
        if (err.error.statusCode === 404) {
          // alert(err.error.message);
          this.alertType = 'danger';
          this.displayAlert = true;
          this.alertMessage = ` ${err.error.message} Please close tab and go to home`;

        }
        console.log(err);
      });


  }
  bookID(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.alertType = 'danger';
      this.displayAlert = true;
      this.alertMessage = ` deleted Please close tab and go to home`;
    }
    );
  }
  closeAlert() {
    this.displayAlert = false;
    this.router.navigate(['list']);
  }

}
