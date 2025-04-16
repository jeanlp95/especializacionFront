import { RouterModule, Routes } from '@angular/router';
import { Class1Component } from './clases/clase1/class1.component';
import { AppComponent } from './app.component';
import { Class2Component } from './clases/clase2/class2.component';
import { Class3Component } from './clases/clase3/class3.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Class4Component } from './clases/clase4/class4/class4.component';
import { Class5Component } from './clases/clase5/class5/class5.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Redirección inicial
    // { path: 'home', component: HomeComponent }, // O usa un componente Home específico
    { path: 'class1', component: Class1Component },
    { path: 'class2', component: Class2Component },
    { path: 'class3', component: Class3Component },
    { path: 'class4', component: Class4Component },
    { path: 'class5', component: Class5Component },
    { path: '**', redirectTo: '/home' } // Para rutas no encontradas
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }