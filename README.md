# react-image-magnifier
A react component that accepts a high-res source image and produces a magnifier window on mouse hover over the part of the image the cursor is over


## Demo

![](http://media.giphy.com/media/xTiTnidsMNlZlf9I2c/giphy.gif)


## Usage

```jsx
import ImageMagnifer from 'react-image-magnifier';

const App = () => (
  <ImageMagnifier
    src: "img/beach-small.jpg",
    height: 300
    width: 400,
    zoomImage={{
      width: 1600,
      height: 1200
    }}
    cursorOffset={{ x: 80, y: -80 }}
  />
)
```

## API (props)

| Prop | Required | Default  | Type | Description |
| :------------- |:---:|:----------------:| :--------------------| :-----|
| `src`          | YES |                  | `String`             | the src |
| `height`       |  NO | `"auto"`         | `Number` or `String` | the height non-zoomed-in image |
| `width`        |  NO | `"100%"`         | `Number` or `String` | the width of the non-zoomed-in image |
| `zoomImage`    |  NO | src size         | `{ width, height }`  | size of the zoomed-in image |
| `cursorOffset` |  NO | `{ x: 0, y: 0 }` | `{ x, y }`           | the offset of the zoom bubble from the cursor |
| `size`         |  NO | `200`            | `Number`             | the size of the magnifier window |
