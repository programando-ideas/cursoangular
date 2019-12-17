import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatosDialogo } from 'src/app/models/datos-dialogo';

@Component({
  selector: 'app-cli-dialogo',
  templateUrl: './cli-dialogo.component.html',
  styles: []
})
export class CliDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CliDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosDialogo) { }

  ngOnInit() { }

  cancelar(): void {
    this.dialogRef.close();
  }


}
