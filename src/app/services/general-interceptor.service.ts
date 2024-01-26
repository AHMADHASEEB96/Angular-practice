import { HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http'
import { tap } from 'rxjs'
export class GeneralInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Do some logic here to be done when ever any request is sent, like setting a common header like
        // clone the request first and and then do the logic on the cloned version.
        const modifiedReq = req.clone({ headers: req.headers.append('anyHeader', 'headerValue') })
        console.log(req.url)
        // then send the new request
        // return next.handle(modifiedReq) // returns an observable
        // Also we can handle the response itself, don't forget the code sends the request always returns a response 
        return next.handle(modifiedReq).pipe(
            tap(event => {

                if (event.type == HttpEventType.Response) {
                    console.log("this is a response ")
                }
            })
        )
    }
} // Now after the interceptor service being created go and provide it in the module as an obj 
// We are using an interceptor to intercept the request and perform some logic then send it again, still we can do some restrictions by using the req object we provided
//{ provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptorService, multi: true,}, this is an angular dependency injection that tells angular we are using this class as an
//interceptor and we can use multiple interceptors without making any of them replace this particular one.
// Make sure to see all the properties from inside the req
