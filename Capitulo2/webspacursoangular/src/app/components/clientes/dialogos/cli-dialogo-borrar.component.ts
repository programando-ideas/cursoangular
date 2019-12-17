import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatosDialogo } from 'src/app/models/datos-dialogo';

@Component({
  selector: 'app-cli-dialogo-borrar',
  templateUrl: './cli-dialogo-borrar.component.html',
  styles: []
})
export class CliDialogoBorrarComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CliDialogoBorrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosDialogo) { }

  ngOnInit() {
  }

  cancelar(): void {
    this.data.id = 0;
    this.dialogRef.close();
  }

}
