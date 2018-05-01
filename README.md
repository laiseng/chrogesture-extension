# Chrome mouse gesture extension
I've been using crxMouse for many years and it serves me well. Recently it has gone rouge by sending lots of analytics stuffs back it's server. hence I've decided to build my own.

This is rather simple gesture control build using rxjs v6, it only does command that i use daily in chrome :-

- **Gesture LEFT** - Page back 
- **Gesture Right** - Page forward
- **Gesture Up** Open new tab
- **Gesture Down** Close current tab
- **Gesture Up, Down** Undo close tab

It has not been published to Chrome Web Store yet (cuz i simply don't know how to do it right now).

You can just load `dist` folder in chrome extension to add them into chrome (make sure you enable developer mode to load unpacked extension).

To use it just hold right mouse button and drag UP, DOWN, LEFT, RIGHT and then release to trigger above command in chrome.

If I have time then I'll enhance more to allow OPTION for customizations.

Right now, it's enough for my use.

I grant you the right to steal this codes and make it your own, credit me if you like.



