import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://polar-pair-backend.vercel.app/rooms';

  constructor(private http: HttpClient) {}

  joinRoom(code: string, name: string, interests: string, image: any) {
    var fd = new FormData()
    fd.append('name', name)
    fd.append('interests', interests)
    fd.append('image', image)
    return this.http.post(`${this.apiUrl}/participant/create/${code}`, fd);
  }

  createRoom(username: string, roomName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${username}/${roomName}`, {});
  }

  deleteRoom(roomCode: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${roomCode}`);
  }

  getRoom(username: string, roomCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/room/${roomCode}`);
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

  getParticipants(roomCode: string): Observable<any> {
    // connor misspelled participant
    return this.http.get(`${this.apiUrl}/partcipant/all/${roomCode}`);
  }

  getAllRooms(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/room/all/${username}`); 
  }
}
