import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import * as signalR from '@microsoft/signalr';  
import { Observable, Subscriber } from 'rxjs';
import { WordResponse } from '../models/responses/wordresponse.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private readonly connection: signalR.HubConnection = new signalR.HubConnectionBuilder()  
    .configureLogging(signalR.LogLevel.Information)  
    .withUrl(`${ environment.brainstormServiceURL }/brainstormHub`)  
    .build();

  constructor() { }

  async connect() {
    try {
      await this.connection.start();
      console.log('Succesfully Connected to Websocket.');
    } catch (err) {
      console.error('Error while connecting to Websocket:', err);
    }
  }

  async disconnect() {
    try {
      this.connection.stop();
      console.log('Successfully disconnected from Websocket')
    } catch (err) {
      console.error('Error while disconnecting from Websocket:', err)
    }
  }

  async joinGroup(groupId: string) {
    await this.connection.invoke('JoinGroup', groupId);
  }

  async leaveGroup(groupId: string) {
    await this.connection.invoke('LeaveGroup', groupId);
  }

  async sendWord(groupId: string, word: string) {
    await this.connection.invoke('SendWord', groupId, word);
  }

  get words(): Observable<WordResponse> {
    return new Observable<WordResponse>((subscriber: Subscriber<WordResponse>) => {
      this.connection.on('Word', (word: WordResponse) => {
        subscriber.next(word);
      })
    })
  }

  get problems(): Observable<string> {
    return new Observable<string>((subscriber: Subscriber<string>) => {
      this.connection.on('Problem', (problem: string) => {
        subscriber.next(problem);
      })
    })
  }
}
