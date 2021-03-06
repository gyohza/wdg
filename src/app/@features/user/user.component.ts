import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/@core/services/user.service';
import { PagedRequest } from 'src/app/@shared/models/paged-request.model';
import { PagedResponse } from 'src/app/@shared/models/paged-response.model';
import { User } from 'src/app/@shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ConfirmationDialogComponent } from 'src/app/@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  dataSource: User[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(
    private _svc: UserService,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  private _sub: Observable<PagedResponse<User[]>>;

  public isLoading: boolean = false;

  public paging: PagedRequest = {
    page: 1,
    per_page: 6,
    total: 0,
  };

  loadUsers({
    pageIndex = 0,
    pageSize = 6,
  } = {}) {
    this.isLoading = true;
    this._sub = this._svc.getUsers({
      page: pageIndex + 1,
      per_page: pageSize,
    });
    this._sub.subscribe(({
      page, per_page, total, total_pages, data, support
    }) => {
      this.dataSource = data;
      this.paging = {
        page, per_page, total
      };
    }, err => {
      console.error(err);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '300px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (!result) return;

        let msg, theme;
        
        if (result instanceof Error) {
          msg = result.message;
          theme = 'mat-warn';
        } else {
          msg = result;
          theme = 'mat-primary';
        }
        
        this.snack.open(msg, 'Dismiss', {
          duration: 3000,
          panelClass: ['mat-toolbar', theme],
        });

        this.loadUsers();
      }
    );
  }

  removeUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: `Confirm removal of ${user.email} from database?`,
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (!result) return;

        let msg, theme;
        
        if (result instanceof Error) {
          this.snack.open(result.message, 'Dismiss', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
        } else {
          this.isLoading = true;

          this._svc.deleteUser(user.id).subscribe(
            res => {
              msg = `Removed ${user.email} from database.`;
              theme = 'mat-primary';

              this.loadUsers();
            },
            err => {
              console.error(err);
              msg = `Failed to remove ${user.email} from database.`;
              theme = 'mat-warn';
            },
            () => {
              this.isLoading = false;
              
              this.snack.open(msg, 'Dismiss', {
                duration: 3000,
                panelClass: ['mat-toolbar', theme],
              });
            }
          );
        }
      }
    );
  }
}
