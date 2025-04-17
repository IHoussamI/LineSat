import { AppComponent } from './app/app.component';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { TokenInterceptor } from './app/Services/Auth/token.interceptor';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import {
  register as registerSwiperElements
} from 'swiper/element/bundle';

registerSwiperElements();

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // Required for SSR
      withInterceptorsFromDi() // Required for class-based interceptors
    ),
    
    // Only if you need class-based interceptors
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    }
  ]
}).catch(err => console.error(err));
