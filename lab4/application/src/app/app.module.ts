import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { CarsComponent } from './cars/cars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicsComponent } from './topics/topics.component';
import { TopicComponent } from './topic/topic.component';

@NgModule({
    declarations: [
        AppComponent,
        ActorComponent,
        CarsComponent,
        TopicsComponent,
        TopicComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }