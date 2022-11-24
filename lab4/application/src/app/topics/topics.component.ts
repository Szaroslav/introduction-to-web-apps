import { Component, Output } from '@angular/core';
import topics from './topics.json';

@Component({
    selector: 'app-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss']
})

export class TopicsComponent {
    topics = topics;
    outputTitle = '';
    outputContent = '';

    renderOutput(content: [string, string]): void {
        this.outputTitle = content[0];
        this.outputContent = content[1];
    }
}