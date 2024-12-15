import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrainstormComponent } from './pages/brainstorm/brainstorm.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { BrainstormTabComponent } from './components/brainstorm-tab/brainstorm-tab.component';
import { ContextAiTabComponent } from './components/context-ai-tab/context-ai-tab.component';
import { HistoryElementComponent } from './components/history-element/history-element.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    BrainstormComponent,
    WordCloudComponent,
    BrainstormTabComponent,
    ContextAiTabComponent,
    HistoryElementComponent,
    DeleteDialogComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    TagCloudComponent,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
