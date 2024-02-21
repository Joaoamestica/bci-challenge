import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {

  addTeamForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addTeamComponent : MatDialogRef<AddTeamComponent>
  ){ }

  /**
   * Initializes the add team form with fields and validation rules.
   */
  ngOnInit(): void {
    this.addTeamForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      code: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  /**
   * Submits the add team form data and closes the modal.
   */
  onFormSubmit(){
    this.addTeamComponent.close({data: this.addTeamForm, close: true})
  }

}
