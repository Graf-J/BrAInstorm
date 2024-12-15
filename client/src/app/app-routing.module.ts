import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BrainstormComponent } from './pages/brainstorm/brainstorm.component';
import { BrainstormGuard } from './services/brainstorm.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'brainstorm', component: BrainstormComponent },
  { path: 'brainstorm/:id', component: BrainstormComponent, canActivate: [BrainstormGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
