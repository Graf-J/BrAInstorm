import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CloudData } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-brainstorm-tab',
  templateUrl: './brainstorm-tab.component.html',
  styleUrls: ['./brainstorm-tab.component.css']
})
export class BrainstormTabComponent {

  isToggleActive: boolean = true;

  @Input() isBrainstormIdSet: boolean = true;
  @Input() data: CloudData[] = []
  @Input() maxWords: number = 0;
  @Input() creator: string | undefined = undefined;
  @Input() title: string | undefined = undefined;
  @Input() errorMessage: string = '';
  @Output() newWordEvent = new EventEmitter<string>();
  @Output() errorMsgClickEvent = new EventEmitter();
  @Output() toggleChangeEvent = new EventEmitter<boolean>();

  // Reactive Form Initialisation
  wordForm = new FormGroup({
    word: new FormControl('', [Validators.required])
  });

  onSubmit(): void {
    const word: string | null | undefined = this.wordForm.value.word;
    // Check if it is an empty word max words not reached yet
    if (word) {
      this.newWordEvent.emit(word);
    }

    this.wordForm.reset();
  }

  onErrorMessageClick() {
    this.errorMessage = '';
  }

  onToggleChange() {
    this.toggleChangeEvent.emit(this.isToggleActive);
  }
}
