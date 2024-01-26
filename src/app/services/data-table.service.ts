import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Subject, throwError, catchError, tap } from 'rxjs'; // for handling errors
import { Post } from '../interfaces/post.model';

@Injectable({
  providedIn: 'root' // instead of provide it in the root module provider
})
export class DataTableService {
  baseUrl: string = "https://jsonplaceholder.typicode.com";
  error = new Subject<string>() // create a new object of subject

  constructor(private http: HttpClient) { }

  postDate(postData: { title: string, content: string }) {
    return this.http.post(`${this.baseUrl}/posts`, postData, {
      //  observe: 'response'// returns the whole response , body by default
      observe: 'response', // returns the whole response obj to the observable to be observed. subscribe to access it 
      // responseType: 'text'
    })
    // In Angular by using observables, for the post to be sent you must first subscribe to declare your interest in the response 
    // Angular creates the headers for me in post request if not passed as a third argument, also turns the js obj to json
  }

  /*  postDate(postData: { title: string, content: string }) {
     this.http.post(`${this.baseUrl}/posts`, postData).subscribe(res => {
       console.log(res)
     }, error => { this.error.next(error.message) })// no the subject is fill with our error, go and subscribe on it from any where
   } */

  getData() {
    let queryParameters = new HttpParams();
    // queryParameters = queryParameters.append("id", 3);
    // queryParameters = queryParameters.append('name', "Hassan")
    // add as many query parameters

    return this.http.get<Post[]>(this.baseUrl + '/posts', {
      headers: new HttpHeaders({
        // add all of your headers here 
        'custom-header': 'hi',
        // Authorization: Bearer {Token}
      }),
      // params: new HttpParams().set("id", 20) // Or
      params: queryParameters,
      observe: 'body',
      // responseType: 'text', // not allowed as long the get<Post[]> is expecting  an array of post ,
      // responseType : "blob"
    }).pipe(
      map(
        // manibulate the raw data as you want then return it
        (res) => res
      ) // returns the data to the next operator, 
      , catchError(er => {
        return throwError(er)
      }
      )
    )
  }

  deleteData(postId: number) {
    return this.http.delete(this.baseUrl + `/posts/${postId}`, {
      observe: 'events', //!1
      responseType: 'json', // ,text, blob for files representation
    }).pipe(
      tap(res => {
        console.log(res, "this is the res from the tap operator")
        if (res.type == HttpEventType.Sent) {
          // HttpEventType.Sent = 0
          console.log(" the request sent") // or manipulate the view (UI)
        }
      })
    ) // you can delete all the posts or not, that is depending on whether does the server allow that or not.
  }

  // The data comes as a response from the get request needs to be transformed into the needed formats which is done via different rxjs operators like map, to use those 
  // to use those operators we need to use pipe, those operators wrap the resulted formatted data into an observable so we can subscribe on it,
  // map is an operator that needs to return data and pass it to pipe that wraps it into an observable, make sure it return the data,

}


/* 
* No subscribtion no request
data-table.service.ts:22 ERROR HttpErrorResponse {headers: _HttpHeaders, status: 200, statusText: 'OK', url: 'https://jsonplaceholder.typicode.com/', ok: false, …}
this error usually means the url is not correct,
- You can use the type you created on the map() argument and also on subscribe argument to identify the structure of the data will be returned in the response, instead of that
angular provides a better way to do that, which is using the type on the request method itself as they all are generic methods, 
- The service is only responsible for sending the data wrapped inside an observable to the component which will have the subscriber there
- The last Argument in the request method is always the object that holds the headers, observe ... 
!1 
, observe determins what is going to be wrapped into the observable
Some http methods support different types of observe , like for example delete method supports the events observe that allow you to do some logic with the response even before 
you subscribe to the observable,
- putting the observe to event will return two objects to be observed, the second is the response obj itself, the first holds a property called type that holds a numeric value, this numeric value can
be compared to the a value from enum (HttpEventType) to determine the status of the event or the request, the enum value has a numeric value to so we are comparing
two numbers after all, remember the enum value is of type number but has a name to be represented in a more human way. 
the observe event, returns twt objects to the observable and then you can subscribe using operator tap or even by subscribing to the observable
*/
