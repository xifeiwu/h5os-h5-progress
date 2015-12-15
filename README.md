# &lt;h5-progress&gt;

## Installation

```bash
$ bower install gaia-components/h5-progress
```

## Usage

### v0.1.x
1. Create h5-progress in HTML:
    ```html
    <h5-progress></h5-progress>
    ```

2. If your h5-progress is indeterminated, simply set `h5-indeterminate` attribute on the instance or HTML so it can show up as indeterminate style. 
    ```html
    <h5-progress h5-indeterminate=""></h5-progress>
    ```
    ```js
    var h5Progress;
    h5Progress.indeterminate = true;
    ```

3. In version 0.1.x, h5-progress indeterminate animation is off by default, you can set `enableIndeterminateAnimation` attribute on the instance to turn on/off the animation.
    ```js
    var h5Progress;
    h5Progress.enableIndeterminateAnimation = true; // Enable animation
    h5Progress.enableIndeterminateAnimation = false; // Disable animation
    ```

### v0.0.x

1. Create h5-progress in HTML:
    ```html
    <h5-progress></h5-progress>
    ```

2. If your h5-progress is indeterminated, simply set `h5-indeterminate` attribute on the instance or HTML so it can show up as indeterminate style. 
    ```html
    <h5-progress h5-indeterminate=""></h5-progress>
    ```
    ```js
    var h5Progress;
    h5Progress.indeterminate = true;
    ```

## Examples

- [Example](https://git.acadine.com/pages/gaia-components/h5-progress/examples/index.html)
