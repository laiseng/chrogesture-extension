
export interface Coordinate { x: number, y: number }

export enum GestureTypes {
    Up,
    Down,
    Left,
    Right
}

const minLength=20;
export class CGesture {
    start: Coordinate;
    end: Coordinate;

    

    constructor() {
        this.doResponse();

        document.addEventListener('mousedown', e => {
            //right button
            if (e.button == 2) {
                this.start = this.getCoordinate(e);
            }
        })

        document.addEventListener('mouseup', e => {
            //right button
            if (e.button == 2) {
                this.end = this.getCoordinate(e);
                this.calculateVector(this.start, this.end);
            }
        });
    }

    calculateVector(start: Coordinate, end: Coordinate) {
        var deg = Math.atan2(start.y - end.y, start.x - end.x) * 180 / Math.PI;
        if (Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)) > minLength) {
            console.log("Deg", deg);
            if (deg > -30 && deg < 30) {
                console.log("gesture", "left");
                this.sendMessage(GestureTypes.Left);
                window.history.back();
            } else if (deg > 60 && deg < 120) {
                console.log("gesture", "up");
                this.sendMessage(GestureTypes.Up);
            } else if (deg > -120 && deg < -60) {
                console.log("gesture", "down");
                this.sendMessage(GestureTypes.Down);
            } else if (deg > 150 || deg < -150) {
                console.log("gesture", "right");
                this.sendMessage(GestureTypes.Right);
                window.history.forward();
            }
        } else {
            this.start = null;
            console.log("not long enough")
        }
    }

    doResponse() {
        console.log("start cgesture")
    }

    getCoordinate(e: MouseEvent): Coordinate {
        return { x: e.clientX, y: e.clientY };
    }

    sendMessage(direction: GestureTypes) {
        chrome.runtime.sendMessage({ direction: direction });
    }
}