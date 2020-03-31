import { Notes } from '../notes-list/notes-list.component';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesService {
    constructor(private http: HttpClient, private cookies: CookieService) { }

    uploadNotes(notes: Notes) {
      return this.http.post('http://localhost:3000/notes', notes)
        .toPromise()
        .then(res => { return <Notes[]>res; });
    }

    deleteNotes(ids: string[]){
      return this.http.post('http://localhost:3000/notes/deleteAll', ids)
      .toPromise()
      .then(res => { return res; });
    }

    updateNotes(notes: Notes) {
      return this.http.put('http://localhost:3000/notes/'+notes["_id"], notes)
        .toPromise()
        .then(res => { return <Notes[]>res; });
    }
  
    getItems(email:string) {
      return this.http.get<Notes[]>('http://localhost:3000/notes/'+email)
        .toPromise()
        .then(res => { return <Notes[]>res; });
    }
  
  }