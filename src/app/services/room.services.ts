import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://polar-pair-backend.vercel.app/rooms';

  constructor(private http: HttpClient) {}

  createRoom(username: string, roomName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${username}/${roomName}`, {});
  }

  deleteRoom(roomCode: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${roomCode}`);
  }

  getRoom(username: string, roomCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/room/${username}/${roomCode}`);
  }

  createParticipant(roomCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/participant/create/${roomCode}`, {});
  }

  deleteParticipant(roomCode: string, name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/participant/delete/${roomCode}/${name}`);
  }

  createPairing(roomCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pairings/create/${roomCode}`, {});
  }

  getPairings(roomCode: string, name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pairings/${roomCode}/${name}`);
  }

  getAllRooms(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/room/all/${username}`);  // Append username to the URL
  }
}
