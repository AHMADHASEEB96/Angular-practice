import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http' // HttpClientModule Must be imported for the http request to work
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutingCardComponent } from './layouts/components/routing-card/routing-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card';
import { DataTableComponent } from './layouts/components/data-table/data-table.component';
import { RoutingDistinationComponent } from './layouts/pages/routing-distination/routing-distination.component'
import { TableModule } from 'primeng/table'
import { SkeletonModule } from 'primeng/skeleton'
import { GeneralInterceptorService } from './services/general-interceptor.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutingCardComponent,
    DataTableComponent,
    RoutingDistinationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToolbarModule,
    AvatarModule,
    CardModule,
    TableModule,
    SkeletonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GeneralInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }], // the interceptors are executed the order they are written here, that order matters
  bootstrap: [AppComponent]
})
export class AppModule { }
