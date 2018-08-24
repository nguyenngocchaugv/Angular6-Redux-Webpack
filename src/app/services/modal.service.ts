import { EventEmitter } from "@angular/core";

export class ModalService {

    openEmitEvent = new EventEmitter<{}>();
    closeEmitEvent = new EventEmitter<{}>();

    open() {
        this.openEmitEvent.emit({});
    }

    close() {
        this.closeEmitEvent.emit({});
    }
}