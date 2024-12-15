import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BrainstormResponse } from 'src/app/models/responses/brainstormresponse.model';

@Component({
  selector: 'app-history-element',
  templateUrl: './history-element.component.html',
  styleUrls: ['./history-element.component.css']
})
export class HistoryElementComponent implements OnInit {
  selectedBrainstormId: string = '';

  @Input() brainstorm!: BrainstormResponse;
  @Output() brainstormClickEvent = new EventEmitter<string>();
  @Output() brainstormDeleteEvent = new EventEmitter();

  constructor(private readonly snackbar: MatSnackBar, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.selectedBrainstormId = params['id'];
    });
  }

  openSnackbar() {
    this.snackbar.open(`${ this.brainstorm.title } ID copied to Clipboard!`, 'Close');
  }

  onClick() {
    this.brainstormClickEvent.emit(this.brainstorm.id);
  }

  onDelete() {
    this.brainstormDeleteEvent.emit({ id: this.brainstorm.id, title: this.brainstorm.title });
  }

}
