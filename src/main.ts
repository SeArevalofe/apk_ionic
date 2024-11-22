import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Para autenticación
import { environment } from './environments/environment'; // Configuración de Firebase

// Inicializa Firebase
const firebaseApp = initializeApp(environment.firebaseConfig);
const auth = getAuth(firebaseApp); // Inicializa autenticación

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
