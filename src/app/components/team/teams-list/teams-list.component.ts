import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TeamService } from '../../../services/team.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTeamComponent } from '../modals/edit-team/edit-team.component';
import { AddTeamComponent } from '../modals/add-team/add-team.component';
import { DeleteTeamComponent } from '../modals/delete-team/delete-team.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.css',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatGridListModule
  ]
})
export class TeamsListComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[];

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'name', 'nickname', 'code', 'city', 'action'];
  }

  ngAfterViewInit(): void {
    this.findAllTeam();
  }


  findAllTeam(): void{
    this.teamService.findAll().subscribe({
      next: (response: any) => {  
        this.dataSource = new MatTableDataSource(response.response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      complete: () => {
      },
      error: () => {
      }
    })
  }

  openDeleteTeam(row : any){
    const dialogRef = this.dialog.open(DeleteTeamComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response && response.close == true) {
          this.deleteTeam(row);
        }
      },
    });
  }

  deleteTeam(row: any) {
    const index = this.dataSource.data.indexOf(row, 0);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
    }
    this.dataSource.data = this.dataSource.data;
  }

  openEditTeam(row: any) {
    const dialogRef = this.dialog.open(EditTeamComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response && response.close == true) {
          this.editTeam(response.data.value);
        }
      },
    });
  }

  editTeam(team : Team){
    let index = this.dataSource.data.findIndex(data => data.id === team.id)
    if (index >= 0) {
      this.dataSource.data[index].name = team.name;
      this.dataSource.data[index].nickname = team.nickname;
      this.dataSource.data[index].code = team.code;
      this.dataSource.data[index].city = team.city;
    }
  }

  openAddTeam() {
    const dialogRef = this.dialog.open(AddTeamComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response && response.close == true) {
          this.addTeam(response.data.value);
        }
      },
    });
  }

  addTeam(team : Team) {
    let lastId = (this.dataSource.data[this.dataSource.data.length -1]).id;
    team.id = lastId + 1;
    this.dataSource.data.push(team);
    this.dataSource.data = this.dataSource.data;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
