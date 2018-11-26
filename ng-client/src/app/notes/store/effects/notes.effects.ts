import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { NotesService } from '../../lib/notes.service';
import {
  CreateNote,
  CreateNoteSuccess,
  LoadNotesSuccess,
  NotesActionTypes
} from '../actions/notes.actions';

@Injectable()
export class NotesEffects {
  @Effect()
  loadNotes$ = this.actions$.pipe(
    ofType(NotesActionTypes.LoadNotes),
    exhaustMap(() => this._notes.all()),
    map(notes => new LoadNotesSuccess(notes))
  );

  @Effect()
  createNote$ = this.actions$.pipe(
    ofType<CreateNote>(NotesActionTypes.CreateNote),
    switchMap(({ payload: draft }) => this._notes.create(draft)),
    map(note => new CreateNoteSuccess(note))
  );

  constructor(private actions$: Actions, private _notes: NotesService) {}
}