import { fromEvent, merge, concat } from "rxjs";
import { switchMap, tap, takeUntil, filter } from "rxjs/operators";
import { Coordinate } from "../models/coordinate.interface";
import { MessageTypes } from "../models/message-types.enum";
import { IBackgroundMessagePayload } from "../models/i-background-message-payload";
import { GestureTypes } from "../models/gesture-types.enum";

const MIN_LENGTH = 10;
export class CGMain {
  inGesture = false;
  gestures: GestureTypes[] = [];
  anchorCoordinate: Coordinate;
  currentAnchorTarget: HTMLAnchorElement;
  indicatorElement: HTMLDivElement;

  constructor() {
    this.initIndicatorElement();
    fromEvent(document, "contextmenu").subscribe((e) => {
      if (this.inGesture) {
        e.preventDefault();
      }
      this.inGesture = false;
    });

    let move$ = fromEvent<MouseEvent>(document, "mousemove").pipe(
      tap((x) => {
        this.showIndicator(true);
      }),
      takeUntil(
        fromEvent(document, "mouseup").pipe(
          tap((e) => {
            this.showIndicator(false);

            this.anchorCoordinate = null;
            if (this.currentAnchorTarget) {
              console.log("is anchor", this.currentAnchorTarget);
              chrome.runtime.sendMessage({
                type: MessageTypes.Url,
                gestures: this.gestures,
                url: this.currentAnchorTarget.href,
              } as IBackgroundMessagePayload);
            } else {
              chrome.runtime.sendMessage({
                type: MessageTypes.Gesture,
                gestures: this.gestures,
                url: null,
              } as IBackgroundMessagePayload);
            }
            this.gestures = [];
          })
        )
      )
    );

    fromEvent<MouseEvent>(document, "mousedown")
      .pipe(
        tap((e) => {
          this.inGesture = false;
        }),
        filter<MouseEvent>((e) => this.isGestureButton(e)),
        tap<MouseEvent>((e) => {
          console.log("tapping mouse down is anchor");
          this.currentAnchorTarget = this.lookupParentsForAnchor(e);
          console.log(
            "[currentAnchorTarget]",
            this.currentAnchorTarget,
            chrome.tabs
          );
        }),
        switchMap((e) => move$)
      )
      .subscribe((e) => {
        // this.addDot(e);
        let currentCoordinate = this.getCoordinate(e);
        if (!this.anchorCoordinate) {
          this.anchorCoordinate = currentCoordinate;
        }

        if (
          this.getDistance(this.anchorCoordinate, currentCoordinate) >
          MIN_LENGTH
        ) {
          this.inGesture = true;
          let vector = this.getVector(
            this.getDegrees(this.anchorCoordinate, currentCoordinate)
          );
          if (vector != null) {
            if (
              (this.gestures.length > 0 &&
                this.gestures[this.gestures.length - 1] != vector) ||
              this.gestures.length == 0
            ) {
              this.gestures.push(vector);
            }

            this.printGestures();
            this.anchorCoordinate = currentCoordinate;
          }
        }
      });

    this.setIFrameMouseEventBorderStyle();
    this.initReadyIndicatorElement();
  }

  lookupParentsForAnchor(e: MouseEvent) {
    console.log("this.currentAnchorTarget", e.target);
    let target = e.target as HTMLAnchorElement;

    if (target.href != null) {
      return target;
    }

    while (target.parentElement) {
      target = target.parentElement as HTMLAnchorElement;
      if (target.href != null) {
        return target;
      }
    }
    return null;
  }

  getCoordinate(e: MouseEvent): Coordinate {
    return { x: e.clientX, y: e.clientY };
  }

  getDistance(start: Coordinate, end: Coordinate) {
    return Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)
    );
  }

  getDegrees(start: Coordinate, end: Coordinate) {
    return (Math.atan2(start.y - end.y, start.x - end.x) * 180) / Math.PI;
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

  isGestureButton(e: MouseEvent) {
    return e.button == 2;
  }

  getVectorText() {
    return this.gestures.map((x) => {
      return GestureTypes[x];
    });
  }

  addDot(e: MouseEvent) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = e.clientX + "px";
    div.style.top = e.clientY + "px";
    div.style.width = "3px";
    div.style.height = "3px";
    div.style.backgroundColor = e.button == 0 ? "red" : "green";
    document.body.appendChild(div);
  }

  initIndicatorElement() {
    this.indicatorElement = document.createElement("div");

    this.indicatorElement.id = "chrogestureid";
    this.indicatorElement.classList.add("chgs-indicator");

    this.showIndicator(false);

    document.body.appendChild(this.indicatorElement);
  }

  initReadyIndicatorElement() {
    let el = document.createElement("div");

    el.id = "chrogestureready";
    el.classList.add("ready-indicator");
    el.innerText = "Ready for gesture";
    el.style.visibility = "hidden";
    document.body.appendChild(el);
  }

  showIndicator(show: boolean) {
    show
      ? (this.indicatorElement.style.visibility = "initial")
      : (this.indicatorElement.style.visibility = "hidden");
  }

  printGestures() {
    this.indicatorElement.innerText = this.gestures
      .map((x) => {
        switch (x) {
          case GestureTypes.Up:
            return "⬆";
          case GestureTypes.Down:
            return "⬇";
          case GestureTypes.Left:
            return "⬅";
          case GestureTypes.Right:
            return "➡";
        }
      })
      .join(" ");
  }
  setIFrameMouseEventBorderStyle() {
    // document.querySelectorAll('iframe').forEach((frame: HTMLIFrameElement) => {
    //   console.log('add iframe style to ', frame);
    //   frame.addEventListener('mouseenter', (e: MouseEvent) => {
    //     (e.target as HTMLElement).style.border = '2px solid #ccff00';
    //   });
    //   frame.addEventListener('mouseleave', (e: MouseEvent) => {
    //     (e.target as HTMLElement).style.border = '';
    //   });
    // })
  }
}
