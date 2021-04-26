import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action, ActionWithConfirmationDialog } from 'src/app/Models/Action';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {

  userInput = '';
  placeHolderText = '';
  constructor(public dialogRef: MatDialogRef<ActionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ActionWithConfirmationDialog) { }

  ngOnInit() {
    this.placeHolderText = `Type in ${this.data.confirmationKeyword} to continue`;
  }

  ok(){
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
