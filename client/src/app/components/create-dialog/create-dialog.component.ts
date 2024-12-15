import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrainstormRequest } from 'src/app/models/requests/brainstormrequest.model';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {

  brainstormForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    maxWords: new FormControl(20, [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  displayLabel(value: number): string {
      return `${ value }`;
  }

  createBrainstorm() {
    const brainstorm: BrainstormRequest = {
      title: this.brainstormForm.value.title!,
      maxWords: this.brainstormForm.value.maxWords!
    }

    this.data.add(brainstorm);
  }
}
