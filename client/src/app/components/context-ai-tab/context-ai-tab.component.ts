import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CloudData } from 'angular-tag-cloud-module';
import { AiService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-context-ai-tab',
  templateUrl: './context-ai-tab.component.html',
  styleUrls: ['./context-ai-tab.component.css']
})
export class ContextAiTabComponent {

  @Input() data: CloudData[] = [];

  isLoading: boolean = false;
  text: string = '';

  // Reactive Form Initialisation
  contextForm = new FormGroup({
    context: new FormControl('', [Validators.required])
  });

  constructor(private readonly aiService: AiService) { }

  onSubmit() {
    this.isLoading = true;

    const context = this.contextForm.value.context || 'en-US';
    const words = this.data.map((data: CloudData) => data.text);

    this.aiService.getContext(context, words).subscribe({
      next: (response: string) => {
          this.text = response;
          this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
          this.text = error.message;
          this.isLoading = false;
      }
    });
  }
}
