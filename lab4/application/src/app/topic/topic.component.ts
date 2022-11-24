import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss']
})

export class TopicComponent {
    @Input() title!: string;
    @Input() shortDescription!: string;
    @Input() longDescription!: string;

    @Output() outputUpdateEvent = new EventEmitter<[string, string]>();

    onButtonClick(): void {
        this.outputUpdateEvent.emit([ this.title, this.longDescription ]);
    }
}
