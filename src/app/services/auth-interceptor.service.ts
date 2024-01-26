import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Authorize all the headers
        const authenticatedReq = req.clone({ headers: req.headers.append('Authorization', 'Bearer{token}') }) // get the old headers , add auth to them then add this new version
        // of the headers to a new request and send it 
        return next.handle(authenticatedReq)
    }
}