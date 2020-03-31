import { Component, OnInit } from '@angular/core';
import { AccessToken } from '../services/loginservices';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NotesService } from '../services/notesservice';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Notes[];
  upload: boolean = false;
  note: Notes = {};
  access:AccessToken = {};
  displayedColumns: string[];

  ngOnInit() {
    this.getProducts();
  }
  constructor(private notesService: NotesService, private cookies: CookieService, private router: Router) {

    if (cookies.get("userInfo") === undefined || cookies.get("userInfo") === "") {
      this.router.navigate(['']);
    }else{
      this.access = <AccessToken>JSON.parse(this.cookies.get("userInfo"))
    }
  }

  getProducts() {
    this.notesService.getItems(this.access.userId).then(res => {
      this.displayedColumns = [ 'select', 'header', 'description','star'];
       this.notes = new MatTableDataSource<Notes>(res).data;
       this.selection = new SelectionModel<Notes>(true, []);
    }).catch(err => {
      alert("something went wrong");
    })
  }
  textHeader: string = "New Note";
  textEdit: string = "Upload"
  update:boolean = false;
  edit(note){
    this.upload = !this.upload;
    this.textHeader = "Edit Note";
    this.textEdit = "Update";
    this.update = true;
    this.note = note;
  }
 
  openNewUplad() {
    this.upload = !this.upload;
    this.textHeader = "New Note";
    this.textEdit = "Upload";
    this.update = false;
    this.note = {};
  }
  closeUpload(){
    this.note = {};
    this.upload = !this.upload;
    this.note = {};
  }

  uploadData() {
    this.note.email = this.access.userId;
    if(this.update){
      this.notesService.updateNotes(this.note).then(
        res => {
          this.getProducts();
          console.log("successfully updated")
          this.upload = !this.upload;
        })
        .catch(err => {
          alert("Somthing went wrong")
        })
    }else{
      this.notesService.uploadNotes(this.note).then(
        res => {
          this.getProducts();
          console.log("successfully upload")
          this.upload = !this.upload;
        })
        .catch(err => {
          alert("Somthing went wrong")
        })
    }
    
    

  }
  
  selection = new SelectionModel<Notes>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.notes.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.notes.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Notes): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  delete(){
    let idsDelete:string[] = [];
    let dataDelete = this.selection["_selected"];

    for (let i = 0; i < dataDelete.length; i++) {
      idsDelete.push(dataDelete[i]._id);
    }
    if(idsDelete.length > 0){
      this.notesService.deleteNotes(idsDelete).then(
        res => {
          this.getProducts();
        })
        .catch(err => {
          alert("Somthing went wrong")
        })
    }
    
  }


}

export interface Notes {
  id?: string,
  header?: string,
  description?: string
  email?:string
  position?: number;
}