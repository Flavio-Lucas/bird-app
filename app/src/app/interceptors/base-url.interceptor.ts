//#region imports

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//#endregion

/**
 * A classe que representa o interceptor que adiciona a base URL à requisição
 */
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  /**
   * Metodo chamado ao interceptar uma requisição HTTP
   *
   * @param req As informações da requisição
   * @param next a função para passar a diante a requisição
   */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone({
      url: `${ environment.api.baseUrl }${ req.url }`
    });
    return next.handle(req);
  }
}
