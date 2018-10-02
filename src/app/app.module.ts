import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WebsocketModule } from './websocket';
import { environment } from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        WebsocketModule.config({
            url: environment.ws
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
