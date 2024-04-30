import { enableProdMode, importProvidersFrom } from '@angular/core';
import 'hammerjs';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app.Routes';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      AppRoutingModule,
      CommonModule,
      MatInputModule
    ),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));


