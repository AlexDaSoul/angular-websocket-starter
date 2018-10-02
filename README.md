# Angular WebSocket starter

> Angular service for WebSocket. Used Rx WebSocketSubject

## Installation
For angular 6:
```bash
$ git clone https://github.com/Angular-RU/angular-websocket-starter.git
$ cd angular-websocket-starter
$ npm install
$ npm run start
$ npm run server
```

## Example

#### Add WebSockets on your project

> in app module

Config:
- url: string (server websocket url)
- reconnectInterval: number (pause between connections)
- reconnectAttempts: number (number of connection attempts)

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebsocketModule } from './websocket';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        WebsocketModule.config({
            url: 'http:localhost:8080'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```


> in components

```typescript
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WebsocketService } from './websocket';
import { WS } from './websocket.events';

export interface IMessage {
    id: number;
    text: string;
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private messages$: Observable<IMessage[]>;

    constructor(private wsService: WebsocketService) {
    }

    ngOnInit() {
        // get messages
        this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);
    }

    public sendMessge(): void {
        this.wsService.send(WS.SEND.SEND_TEXT, 'My Message Text');
    }

}
```


> config for message names

Open src/app/websocket.events.ts and edit names

```typescript
export const WS = {
    ON: {
        MESSAGES: 'messages',
        COUNTER: 'counter',
        UPDATE_TEXTS: 'update-texts'
    },
    SEND: {
        SEND_TEXT: 'set-text',
        REMOVE_TEXT: 'remove-text'
    }
};
```
