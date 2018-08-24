import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalService } from '../../../services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() bodyText: string;
    @Input() id: string;
    openModalSub: Subscription;
    closeModalSub: Subscription;
    private element: any;
    

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        document.getElementById('modal-backdrop').style.display = "none";
        this.openModalSub = this.modalService.openEmitEvent.subscribe(() => {
            this.open();
        });
        this.closeModalSub = this.modalService.closeEmitEvent.subscribe(() => {
            this.close();
        });
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        // this.modalService.remove(this.id);
        this.element.remove();
        this.openModalSub.unsubscribe();
        this.closeModalSub.unsubscribe();
    }

    // open modal
    open(): void {
        this.element.firstElementChild.style.display = "block";
        document.getElementById('exampleModalCenter').classList.add('show');
        document.getElementById('modal-backdrop').classList.add('show');
        document.getElementById('modal-backdrop').style.display = "block";
    }

    // close modal
    close(): void {
        this.element.firstElementChild.style.display = "none";
        document.getElementById('exampleModalCenter').classList.remove('show');
        document.getElementById('modal-backdrop').classList.remove('show');
        document.getElementById('modal-backdrop').style.display = "none";
        
    }
}