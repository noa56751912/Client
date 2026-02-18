import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // הייבוא שהיה חסר
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ]
};