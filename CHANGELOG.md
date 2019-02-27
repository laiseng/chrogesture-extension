# Change log

# v0.0.4 (2019-02-27)

- minor bugfix
- reorganize source structure so that dist folder is only for dist.
- `npm audit fix`

# v0.0.3 (2019-02-14)

- remove yarn.lock to use npm in future
- security vulnerability fix using `npm audit fix`

# v0.0.2 (2018-05-01)

releasing first use-able version

### Feature

- Drag mouse while holding right click and then release at 4 direction
- **Up**, **Down**, **Left**, **Right** mode is supported right now
- Holding right mouse button and drag 90deg **up** and release will trigger **new tab**
- Holding right mouse button and drag 90deg **down** and release will trigger **close current tab**
- Holding right mouse button and drag 90deg **left** and release will trigger **history back **
- Holding right mouse button and drag 90deg **right** and release will trigger **history forward**
- Non configureable trigger setting as of now. all command is fixed. Future enhancement will contain configurable setting for each gesture direction
