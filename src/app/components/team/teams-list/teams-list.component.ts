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

  /**
   * Initialize the columns to be displayed in the table.
   */
  ngOnInit(): void {
    this.displayedColumns = ['id', 'name', 'nickname', 'code', 'city', 'action'];
  }

  /**
   * Load the teams after the view has been initialized.
   */
  ngAfterViewInit(): void {
    this.findAllTeam();
  }

  /**
   * Get list of teams.
   */
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

  /**
   * Open modal to delete a team.
   * @param row 
   */
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

  /**
   * Delete a team.
   * @param row 
   */
  deleteTeam(row: any) {
    const index = this.dataSource.data.indexOf(row, 0);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
    }
    this.dataSource.data = this.dataSource.data;
  }

  /**
   * Open modal to edit a team.
   * @param row 
   */
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

  /**
   * Edit a team.
   * @param team 
   */
  editTeam(team : Team){
    let index = this.dataSource.data.findIndex(data => data.id === team.id)
    if (index >= 0) {
      this.dataSource.data[index].name = team.name;
      this.dataSource.data[index].nickname = team.nickname;
      this.dataSource.data[index].code = team.code;
      this.dataSource.data[index].city = team.city;
    }
  }

  /**
   * Open modal to add a team.
   */
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

  /**
   * Add a team.
   * @param team 
   */
  addTeam(team : Team) {
    let lastId = (this.dataSource.data[this.dataSource.data.length -1]).id;
    team.id = lastId + 1;
    this.dataSource.data.push(team);
    this.dataSource.data = this.dataSource.data;
  }

  /**
   * Filters table data based on search term.
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
