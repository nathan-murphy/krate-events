import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class EventsService {

    private eventTypes: string[] = ['Potluck', 'Other'];

    constructor() { }

    getEventTypes() {
        return [...this.eventTypes];
    }
}