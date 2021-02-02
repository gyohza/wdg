import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/@core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/@shared/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
  });

  public isLoading: boolean = true;

  public user: User = null;

  constructor(
    private fb: FormBuilder,
    private _svc: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this._svc.getUser(this.data).subscribe(
      res => {
        this.user = res.data;
        this.userForm.patchValue({
          firstName: this.user.first_name,
          lastName: this.user.last_name,
        });
        this.isLoading = false;
      }
    )
  }

  onSubmit() {
    this.isLoading = true;
    const {firstName, lastName} = this.userForm.value;
    this.user = Object.assign(this.user, {
      first_name: firstName,
      last_name: lastName
    });
    this._svc.updateUser(this.user).subscribe(
      res => this.dialogRef.close('User updated!'),
      err => this.dialogRef.close('Uh-oh. Something went wrong.')
    );
  }

  closeSelf() {
    this.dialogRef.close();
  }
}
