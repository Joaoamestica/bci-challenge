import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-delete-team',
  standalone: true,
  imports: [MatFormFieldModule , MatButtonModule, MatDialogModule],
  templateUrl: './delete-team.component.html',
  styleUrl: './delete-team.component.css'
})
export class DeleteTeamComponent implements OnInit{

  nameTeam !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : any,
    private deleteTeamComponent : MatDialogRef<DeleteTeamComponent>
  ){ }

  ngOnInit(): void {
    this.nameTeam = this.data.name;
  }
  
  confirmDeleteTeam() {
    this.deleteTeamComponent.close({close: true})
  }

}
