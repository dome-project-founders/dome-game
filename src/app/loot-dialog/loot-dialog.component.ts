import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loot-dialog',
  templateUrl: './loot-dialog.component.html',
  styleUrls: ['./loot-dialog.component.scss']
})
export class LootDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LootDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  loots = this.data;
  lootColors = [];

  ngOnInit(): void {
    console.log(this.data);
  }

}
