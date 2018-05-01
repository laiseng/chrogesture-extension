
import { fromEvent, merge, concat } from 'rxjs';
import { switchMap, tap, takeUntil, filter } from 'rxjs/operators';

export interface Coordinate { x: number, y: number }
export class Gestures {
    gestures: GestureTypes[];
}
export enum GestureTypes {
    Up,
    Down,
    Left,
    Right
}

const MIN_LENGTH = 20;
export class CGesture {
    inGesture = false;
    gestures: GestureTypes[] = [];
    anchorCoordinate: Coordinate;
    constructor() {

        fromEvent(document, 'contextmenu').subscribe(e => {
            if (this.inGesture) {
                e.preventDefault();
            }
            this.inGesture = false;
        });

        let move$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
            takeUntil(fromEvent(document, 'mouseup').pipe(
                tap(e => {
                    this.anchorCoordinate = null;
                    chrome.runtime.sendMessage({ gestures: this.gestures } as Gestures);
                    this.gestures = [];
                })
            )));


        fromEvent<MouseEvent>(document, 'mousedown').pipe(
            tap(e => {
                e.button == 0 ? this.inGesture = false : null;
            }),
            filter<MouseEvent>(e => e.button == 2),
            switchMap(e => move$)
        ).subscribe(e => {
            this.inGesture = true;
            // this.addDot(e);
            let currentCoordinate = this.getCoordinate(e);
            if (!this.anchorCoordinate) {
                this.anchorCoordinate = this.getCoordinate(e);
            }

            if (this.getDistance(this.anchorCoordinate, currentCoordinate) > MIN_LENGTH) {
                let vector = this.getVector(this.getDegrees(this.anchorCoordinate, currentCoordinate));
                if (vector != null) {
                    if ((this.gestures.length > 0 && this.gestures[this.gestures.length - 1] != vector) || this.gestures.length == 0) {
                        this.gestures.push(vector);
                    }
                    this.anchorCoordinate = currentCoordinate;
                }
            }
        })


    }
    getCoordinate(e: MouseEvent): Coordinate {
        return { x: e.clientX, y: e.clientY };
    }

    getDistance(start: Coordinate, end: Coordinate) {
        return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
    }

    getDegrees(start: Coordinate, end: Coordinate) {
        return Math.atan2(start.y - end.y, start.x - end.x) * 180 / Math.PI;
    }

    getVector(deg: number) {
        if (deg > -30 && deg < 30) {
            console.log("gesture", "left");
            // window.history.back();
            return GestureTypes.Left;
        } else if (deg > 60 && deg < 120) {
            console.log("gesture", "up");
            return GestureTypes.Up;
        } else if (deg > -120 && deg < -60) {
            console.log("gesture", "down");
            return GestureTypes.Down;
        } else if (deg > 150 || deg < -150) {
            console.log("gesture", "right");
            // window.history.forward();
            return GestureTypes.Right;
        }
        console.log("undefined");
    }

    getVectorText() {
        return this.gestures.map(x => {
            return GestureTypes[x];
        })
    }
    addDot(e: MouseEvent) {
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = e.clientX + 'px';
        div.style.top = e.clientY + 'px';
        div.style.width = '3px';
        div.style.height = '3px';
        div.style.backgroundColor = e.button == 0 ? 'red' : 'green';
        document.body.appendChild(div);

    }
}
