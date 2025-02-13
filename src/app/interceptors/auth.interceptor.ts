import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    console.log("🛡 Intercepteur: Token récupéré:", token); // Debug

    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });

      console.log("📤 Requête envoyée avec Headers:", cloned.headers); // Debug
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
