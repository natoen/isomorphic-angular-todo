import { platformUniversalDynamic } from 'angular2-universal';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformUniversalDynamic().bootstrapModule(AppModule);
});
