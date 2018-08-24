import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SiderbarComponent {
    isActive: boolean = false;
    collapsed: boolean = false;

    @Output() collapsedEvent = new EventEmitter<boolean>();
    
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

}