import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/@core/services/user.service';
import { PagedRequest } from 'src/app/@shared/models/paged-request.model';
import { PagedResponse } from 'src/app/@shared/models/paged-response.model';
import { User } from 'src/app/@shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private _svc: UserService) {}

  private _sub: Observable<PagedResponse<User>>;

  public isLoading: boolean = false;

  public paging: PagedRequest = {
    page: 1,
    per_page: 20,
    total: 0,
  };

  loadUsers({
    pageIndex = 0,
    pageSize = 5,
  } = {}) {
    this.isLoading = true;
    this._sub = this._svc.getUsers({
      page: pageIndex + 1,
      per_page: pageSize,
    });
    this._sub.subscribe(({
      page, per_page, total, total_pages, data, support
    }) => {
      this.dataSource.data = data;
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

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
