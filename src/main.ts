import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import 'zone.js'; // Included for Angular support
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [], // No need to import BrowserModule here
}).catch((err) => console.error(err));
