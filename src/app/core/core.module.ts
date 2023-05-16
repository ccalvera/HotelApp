import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SecurityGuard } from './guard/security.guard';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [],
  providers: [
    HttpService,
    SecurityGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class CoreModule {}
