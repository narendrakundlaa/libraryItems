import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BooksList } from './models/listBooks.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  loginStautus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl = 'http://localhost:3000/bookList';
  requestList = 'http://localhost:3000/';
  borrowedList = 'http://localhost:3000/borrowedList';
  constructor(private httpClient: HttpClient) { }
  /** search Books */
  // searchBooks(searchString: string): Observable<BooksList[]> {
  //   return this.httpClient.get<BooksList[]>(this.baseUrl + searchString);
  // }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}

// get list of books
  getListOfBooks(): Observable<BooksList[]> {
    return this.httpClient.get<BooksList[]>(this.baseUrl);
  }

  // getbyID
  getListOfBooksById(id: number): Observable<BooksList> {
    return this.httpClient.get<BooksList>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
}

// updaate books
updateBarrowBookBookList(book: BooksList): Observable<void> {
  return this.httpClient.put<void>(`${this.baseUrl}/${book.id}`, book, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })
      .pipe(catchError(this.handleError));
}

// delete books
deleteBook(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.borrowedList}/${id}`)
      .pipe(catchError(this.handleError));
}


  addBook(book: BooksList): Observable<BooksList> {
    return this.httpClient.post<BooksList>(this.baseUrl, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  barrowedBook(book: BooksList): Observable<BooksList> {
    return this.httpClient.post<BooksList>(this.borrowedList, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getBorrowedHistory(): Observable<BooksList[]> {
    return this.httpClient.get<BooksList[]>(this.borrowedList);
  }


  requestBook(book: BooksList): Observable<BooksList> {
    return this.httpClient.post<BooksList>(this.requestList + 'requestList', book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  updateLoginStatus(status: boolean) {
    this.loginStautus.next(status);
  }

}
