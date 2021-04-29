import { fromEvent, merge, concat, Observable, timer } from 'rxjs';
import { switchMap, tap, takeUntil, filter, take } from 'rxjs/operators';
import { Coordinate } from '../models/coordinate.interface';
import { MessageTypes } from '../models/message-types.enum';
import { IBackgroundMessagePayload } from '../models/i-background-message-payload';
import { GestureTypes } from '../models/gesture-types.enum';
import { StorageUtil } from './storage';

const MIN_LENGTH = 10;
export class CGMain {
  inGesture = false;
  gestures: GestureTypes[] = [];
  anchorCoordinate: Coordinate;
  currentAnchorTarget: HTMLAnchorElement;
  indicatorElement: HTMLDivElement;
  move$: Observable<MouseEvent>;
  forceOverIFrameState = false;

  constructor() {
    this.initMouseGestureDirections();

    this.listenToMouseEvents();

    this.initStorageListeners();

    this.listenToMutationObserver();

    //This should be last once all init and event listening is done

    this.showMessage('Gesture ready');
  }

  async initStorageListeners() {
    // load from storage setting
    this.forceOverIFrameState = await StorageUtil.getSyncValue<boolean>('ForceOverIFrame');
    console.log('this is what i get ForceOverIFrame', this.forceOverIFrameState);

    // on popup setting change set iframe accordingly
    chrome.storage.onChanged.addListener((changes, namespace) => {
      console.log(changes);
      this.toggleAllIFramePointerEvent(changes?.ForceOverIFrame?.newValue);
    });
  }

  listenToMouseEvents() {
    fromEvent(document, 'contextmenu').subscribe((e) => {
      if (this.inGesture) {
        e.preventDefault();
      }
      this.inGesture = false;
    });

    this.move$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
      tap((x) => {
        this.showIndicator(true);
      }),
      takeUntil(
        fromEvent(document, 'mouseup').pipe(
          tap((e) => {
            this.showIndicator(false);

            this.anchorCoordinate = null;
            if (this.currentAnchorTarget) {
              console.log('is anchor', this.currentAnchorTarget);
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

    fromEvent<MouseEvent>(document, 'mousedown')
      .pipe(
        tap((e) => {
          this.inGesture = false;
        }),
        filter<MouseEvent>((e) => this.isGestureButton(e)),
        tap<MouseEvent>((e) => {
          console.log('tapping mouse down is anchor');
          this.currentAnchorTarget = this.lookupParentsForAnchor(e);
          console.log('[currentAnchorTarget]', this.currentAnchorTarget, chrome.tabs);
        }),
        switchMap((e) => this.move$)
      )
      .subscribe((e) => {
        //TODO add options to allow trailing dots on gesture
        // this.addDot(e);
        let currentCoordinate = this.getCoordinate(e);
        if (!this.anchorCoordinate) {
          this.anchorCoordinate = currentCoordinate;
        }

        if (this.getDistance(this.anchorCoordinate, currentCoordinate) > MIN_LENGTH) {
          this.inGesture = true;
          let vector = this.getVector(this.getDegrees(this.anchorCoordinate, currentCoordinate));
          if (vector != null) {
            if ((this.gestures.length > 0 && this.gestures[this.gestures.length - 1] != vector) || this.gestures.length == 0) {
              this.gestures.push(vector);
            }

            this.printGestures();
            this.anchorCoordinate = currentCoordinate;
          }
        }
      });
  }

  toggleIFramePointerEvents(element: HTMLElement, toogleAdd: boolean) {
    toogleAdd ? element.classList.add('pointer-event-none') : element.classList.remove('pointer-event-none');
  }

  disablePointerEventOnClick(element: HTMLElement) {
    // attach to parentElement because iframe do have event propagation
    fromEvent(element.parentElement, 'mousedown')
      .pipe(
        tap((t) => console.log(t)),
        filter((click) => (click as MouseEvent).button == 0),
        take(1)
      )
      .subscribe((ev) => {
        this.toggleIFramePointerEvents((ev.target as HTMLElement).querySelector('iframe'), false);
        this.showMessage('Enabled IFrame interaction');
      });
  }

  toggleAllIFramePointerEvent(toogleAdd: boolean) {
    document.querySelectorAll('iframe').forEach((iframe) => {
      this.toggleIFramePointerEvents(iframe, toogleAdd);
    });
  }

  // listent to DOM Mutation inorder to enable IFrame event bubbling
  listenToMutationObserver() {
    // Select the node that will be observed for mutations
    const targetNode = document;

    // Options for the observer (which mutations to observe)
    const config: MutationObserverInit = { childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationsList: MutationRecord[], observer: MutationObserver) => {
      mutationsList
        .filter((mut) => mut.type === 'childList')
        .forEach((mut) => {
          mut.addedNodes?.forEach((node) => {
            if (node.nodeName == 'IFRAME') {
              console.log('iframe found added', node);
              this.toggleIFramePointerEvents(node as HTMLElement, this.forceOverIFrameState);
              this.disablePointerEventOnClick(node as HTMLElement);
            }
          });
        });
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    // observer.disconnect();
  }

  lookupParentsForAnchor(e: MouseEvent) {
    console.log('this.currentAnchorTarget', e.target);
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
    return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
  }

  getDegrees(start: Coordinate, end: Coordinate) {
    return (Math.atan2(start.y - end.y, start.x - end.x) * 180) / Math.PI;
  }

  getVector(deg: number) {
    if (deg > -30 && deg < 30) {
      console.log('gesture', 'left');
      // window.history.back();
      return GestureTypes.Left;
    } else if (deg > 60 && deg < 120) {
      console.log('gesture', 'up');
      return GestureTypes.Up;
    } else if (deg > -120 && deg < -60) {
      console.log('gesture', 'down');
      return GestureTypes.Down;
    } else if (deg > 150 || deg < -150) {
      console.log('gesture', 'right');
      // window.history.forward();
      return GestureTypes.Right;
    }
    console.log('undefined');
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
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = e.clientX + 'px';
    div.style.top = e.clientY + 'px';
    div.style.width = '3px';
    div.style.height = '3px';
    div.style.backgroundColor = e.button == 0 ? 'red' : 'green';
    document.body.appendChild(div);
  }

  initMouseGestureDirections() {
    this.indicatorElement = document.createElement('div');

    this.indicatorElement.id = 'chrogestureid';
    this.indicatorElement.classList.add('chgs-indicator');

    this.showIndicator(false);

    document.body.appendChild(this.indicatorElement);
  }

  showMessage(msg: string) {
    let el = document.createElement('div');

    el.id = 'chrogesture-messagebox';
    el.classList.add('message-box');
    el.innerText = msg;
    el.style.visibility = 'hidden';
    document.body.appendChild(el);
    timer(3000).subscribe((x) => {
      el.remove();
    });
  }

  showIndicator(show: boolean) {
    show ? (this.indicatorElement.style.visibility = 'initial') : (this.indicatorElement.style.visibility = 'hidden');
  }

  printGestures() {
    this.indicatorElement.innerText = this.gestures
      .map((x) => {
        switch (x) {
          case GestureTypes.Up:
            return '🔼';
          case GestureTypes.Down:
            return '🔽';
          case GestureTypes.Left:
            return '◀';
          case GestureTypes.Right:
            return '▶';
        }
      })
      .join(' ');
  }
}
