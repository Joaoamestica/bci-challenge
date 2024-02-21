import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-team',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css'
})
export class EditTeamComponent {

  editTeamForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data : any,
    private editTeamComponent : MatDialogRef<EditTeamComponent>
  ) { }

  ngOnInit(): void {
    this.editTeamForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      code: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
    this.loadData();
  }

  loadData(){
    this.editTeamForm.get('id')?.setValue(this.data.id);
    this.editTeamForm.get('name')?.setValue(this.data.name);
    this.editTeamForm.get('nickname')?.setValue(this.data.nickname);
    this.editTeamForm.get('code')?.setValue(this.data.code);
    this.editTeamForm.get('city')?.setValue(this.data.city);
  }

  onFormSubmit(){
    this.editTeamComponent.close({data: this.editTeamForm, close: true})
  }
}
