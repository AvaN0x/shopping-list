import { Injectable, signal } from '@angular/core';
import { NULL_UUID, uuid } from '../utils/uuid';

@Injectable({
  providedIn: 'root',
})
export class SingleEditService {
  currentEditId = signal<string>(NULL_UUID);

  /**
   * Start a new edit session
   * @returns The id of the edit session
   */
  startEdit(): string {
    const id = uuid();
    this.currentEditId.set(id);
    return id;
  }
}
