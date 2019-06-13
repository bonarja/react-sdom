# react-sdom [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/bonarja/react-sdom/blob/master/LICENSE) [![NPM version](https://img.shields.io/npm/v/react-sdom.svg)](https://www.npmjs.com/package/react-sdom)

react-sdom is an extension to access the React DOM using references, it returns a ref object with the extra functions of sdom, simplifying the task of manipulating the html DOM and are similar to the most common functions of the old jQuery, all this in a simpler and lighter script summarizing only the essential and more useful.

react-sdom Includes functions to animate the DOM using animate.css as a promise and ajax request.

<br/>

## check the complete documentation in the following link

## [https://bonarja.github.io/sdom/#/React](https://bonarja.github.io/sdom/#/React)

```javascript
import React from "react";
import { Sdom } from "react-sdom";

class Home extends React.Component {
    title = Sdom(); // get Sdom ref h1

    componentDidUpdate() {
        // use Sdom ref
        this.title
            .css({
                color: "coral",
                textTransform: "uppercase"
            })
            .in("bounceIn", 700)
            .then(() => {
                console.log("finished animation");
            });
    }

    render() {
        return (
            <div>
                <h1 ref={this.title}>hello</h1>
            </div>
        );
    }
}
export default Home;
```
