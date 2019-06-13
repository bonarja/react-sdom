import React from "react";
import "./sdom.css";

const SDOM = new (function() {
    this.attr = function(a, b) {
        if (typeof a === "string" && typeof b == "string") {
            this.forEach(function(x) {
                x.setAttribute(a, b);
                return this;
            });
            return this;
        } else if (typeof a === "string" && !b) {
            if (this instanceof HTMLElement) {
                return this.getAttribute(a);
            } else if (this[0]) {
                return this[0].getAttribute(a);
            } else {
                return null;
            }
        }
    };
    this.addClass = function(a) {
        var list;
        if (typeof a === "string") {
            list = a.split(" ");
        } else {
            list = a;
        }
        this.forEach(function(x) {
            if (x) {
                list.forEach(function(_class) {
                    if (x.classList) {
                        x.classList.add(_class);
                    } else {
                        x[_class] += " " + _class;
                    }
                });
            }
        });
        return this;
    };
    this.removeClass = function(a) {
        var list;
        if (typeof a === "string") {
            list = a.split(" ");
        } else {
            list = a;
        }
        this.forEach(function(x) {
            if (x) {
                list.forEach(function(_class) {
                    if (x.classList) {
                        x.classList.remove(_class);
                    } else if (x[_class]) {
                        x[_class] = x[_class].replace(
                            new RegExp(
                                "(^|\\b)" +
                                    _class.split(" ").join("|") +
                                    "(\\b|$)",
                                "gi"
                            ),
                            " "
                        );
                    }
                });
            }
        });
        return this;
    };
    this.toggleClass = function(a) {
        this.forEach(function(x) {
            x.classList.toggle(a);
        });
        return this;
    };
    this.html = function(a) {
        if (a === undefined) {
            if (this instanceof HTMLElement) {
                return this.innerHTML;
            } else {
                if (this[0]) {
                    return this[0].innerHTML;
                } else {
                    return "";
                }
            }
        } else if (a) {
            this.forEach(function(x) {
                x.innerHTML = a;
            });
            return this;
        }
    };
    this.css = function(a, b) {
        var include = [
            "border-radius",
            "border-bottom-left-radius",
            "border-top-left-radius",
            "border-bottom-right-radius",
            "border-top-right-radius",
            "left",
            "top",
            "bottom",
            "right"
        ];
        if (
            typeof a === "string" &&
            (typeof b === "string" || typeof b === "number")
        ) {
            if (typeof b === "number") {
                b = b + "px";
            }
            this.forEach(function(x) {
                x.style[a] = b;
            });
        } else if (typeof a === "object" && !b) {
            var action = function(key, a) {
                this.forEach(function(x) {
                    if (
                        typeof a[key] === "number" &&
                        a[key] !== 0 &&
                        (include.includes(key) ||
                            /width|padding|margin|height/.test(key))
                    ) {
                        a[key] = a[key] + "px";
                    }
                    x.style[key] = a[key];
                });
            };

            for (var key in a) {
                action(key, a);
            }
        } else if (typeof a === "string" && !b) {
            // GET STYLE
            var style;
            if (this instanceof HTMLElement) {
                style = this.currentStyle || window.getComputedStyle(this);
            } else {
                style =
                    this[0].currentStyle || window.getComputedStyle(this[0]);
            }
            return style[a];
        }
        return this;
    };
    this.px = function(a) {
        var el;
        if (this instanceof HTMLElement) {
            el = this;
        } else if (this[0]) {
            el = this[0];
        } else {
            return null;
        }
        var style = el.currentStyle || window.getComputedStyle(el);
        if (!style[a]) return null;
        return Number(style[a].match(/\d/g).join(""));
    };
    this.width = function(a) {
        if (a) {
            if (typeof a === "number") {
                a = a + "px";
            }
            this.forEach(function(x) {
                x.offsetWidth = a;
            });
            return this;
        } else if (this instanceof HTMLElement) {
            return this.offsetWidth;
        } else if (this[0]) {
            return this[0].offsetWidth;
        } else {
            return null;
        }
    };
    this.height = function(a) {
        if (a) {
            if (typeof a === "number") {
                a = a + "px";
            }
            this.forEach(function(x) {
                x.offsetHeight = a;
            });
            return this;
        } else if (this instanceof HTMLElement) {
            return this.offsetHeight;
        } else if (this[0]) {
            return this[0].offsetHeight;
        } else {
            return null;
        }
    };
    this.parent = function() {
        if (this instanceof HTMLElement) {
            return this.parentElement;
        } else if (this[0]) {
            return this[0].parentElement;
        } else {
            return false;
        }
    };
    this.visible = function(a) {
        if (a === true || a === false) {
            var val;
            if (a === true) {
                val = "block";
            } else if (a === false) {
                val = "none";
            } else {
                val = a;
            }
            this.forEach(function(x) {
                x.style.display = val;
            });
            return this;
        } else if (typeof a === "string") {
            this.forEach(function(x) {
                x.style.display = a;
            });
            return this;
        } else {
            var el;
            if (this instanceof HTMLElement) {
                el = this;
            } else if (this[0]) {
                el = this[0];
            } else {
                return false;
            }

            if (!el.style) {
                return false;
            }

            if (el.style.display === "none") {
                return false;
            } else {
                return true;
            }
        }
    };
    this.next = function() {
        var el;
        if (this instanceof HTMLElement) {
            el = this;
        } else if (this[0]) {
            el = this[0];
        } else {
            return false;
        }
        return el.nextElementSibling;
    };
    this.prev = function() {
        var el;
        if (this instanceof HTMLElement) {
            el = this;
        } else if (this[0]) {
            el = this[0];
        } else {
            return false;
        }
        return el.previousElementSibling;
    };
    this.on = function(a, b) {
        this.forEach(function(x) {
            x["on" + a] = b;
        });
    };
    this.click = function(a) {
        if (a) {
            this.forEach(function(x) {
                x.onclick = a;
            });
        } else {
            this.forEach(function(x) {
                x.click();
            });
        }
    };
    this.in = function(a) {
        var _arguments = arguments;
        var self = this;
        return new Promise(function(done) {
            var time = 800,
                display = "block",
                fx = a;
            for (var arg in _arguments) {
                var aux = _arguments[arg];
                if (arg !== 0) {
                    if (aux === "block" || aux === "flex") {
                        display = aux;
                    } else if (typeof aux === "number") {
                        time = aux;
                    }
                }
            }
            var _class = ["animated", fx];
            self.forEach(function(x) {
                x.removeAttribute("hidden");
                x.style.display = display;
                _class.forEach(function(c) {
                    if (x.classList) {
                        x.classList.add(c);
                    } else {
                        x[c] += " " + c;
                    }
                });
                x.style.animationDuration = time + "ms";
            });
            setTimeout(function() {
                self.removeClass(_class);
                done(self);
            }, time);
        });
    };
    this.out = function(a) {
        var self = this;
        var _arguments = arguments;
        return new Promise(function(done) {
            var time = 800;
            for (var arg in _arguments) {
                var aux = _arguments[arg];
                if (arg !== 0) {
                    if (typeof aux === "number") {
                        time = aux;
                    }
                }
            }
            var _class = ["animated", a];
            self.forEach(function(x) {
                x.style.animationDuration = time + "ms";
                _class.forEach(function(c) {
                    if (x.classList) {
                        x.classList.add(c);
                    } else {
                        x[c] += " " + c;
                    }
                });
            });
            setTimeout(function() {
                self.css("display", "none");
                self.removeClass(_class);
                done(self);
            }, time);
        });
    };
    this.animate = function(a, time) {
        var self = this;
        var _class = ["animated", a];
        if (!time) {
            time = 800;
        }
        return new Promise(function(done) {
            self.forEach(function(x) {
                x.style.animationDuration = time + "ms";
                _class.forEach(function(c) {
                    if (x.classList) {
                        x.classList.add(c);
                    } else {
                        x[c] += " " + c;
                    }
                });
            });
            setTimeout(function() {
                self.removeClass(_class);
                done(self);
            }, time);
        });
    };
    this.focus = function(a, b) {
        if (!a && !b) {
            if (this instanceof HTMLElement) {
                return this.hasFocus();
            } else if (this[0]) {
                return this[0].hasFocus();
            } else {
                return false;
            }
        }

        if (a) {
            this.forEach(function(x) {
                x.onfocus = a;
            });
        }
        if (b) {
            this.forEach(function(x) {
                x.onblur = b;
            });
        }
        return this;
    };
    this.val = function(a) {
        if (a !== undefined) {
            this.forEach(function(x) {
                x.value = a;
            });
            return this;
        } else {
            if (this instanceof HTMLElement) {
                return this.value;
            } else if (this[0]) {
                return this[0].value;
            } else {
                return false;
            }
        }
    };
    this.append = function(a) {
        var tmp;
        if (typeof a == "string") {
            tmp = document.createElement("div");
            tmp.innerHTML = a;
        }
        this.forEach(function(x) {
            if (typeof a == "string") {
                while (tmp.children.length > 0) {
                    x.appendChild(tmp.children[0]);
                }
            } else {
                x.appendChild(a);
            }
        });
        return this;
    };
    this.prepend = function(a) {
        var tmp;
        if (typeof a == "string") {
            tmp = document.createElement("div");
            tmp.innerHTML = a;
        }
        this.forEach(function(x) {
            if (typeof a == "string") {
                while (tmp.children.length > 0) {
                    x.insertBefore(
                        tmp.children[tmp.children.length - 1],
                        x.firstChild
                    );
                }
            } else {
                x.insertBefore(a, x.firstChild);
            }
        });
        return this;
    };
})();

const watch = function(context, varName, get) {
    var value = context[varName];
    Object.defineProperty(context, varName, {
        get: function() {
            return get(varName, value, context);
        }
    });
};

const selector = function(el) {
    var data = {
        forEach(callback) {
            for (let x = 0; x < this.length; x++) {
                callback(this[x], x);
            }
        },
        addClass: SDOM.addClass,
        append: SDOM.append,
        attr: SDOM.attr,
        click: SDOM.click,
        css: SDOM.css,
        find(val) {
            if (this[0]) {
                return selector(this[0].querySelectorAll(val));
            }
            return false;
        },
        findOne(val) {
            if (this[0]) {
                return selector(this[0].querySelector(val));
            }
            return false;
        },
        focus: SDOM.focus,
        hasClass: SDOM.hasClass,
        height: SDOM.height,
        html: SDOM.html,
        on: SDOM.on,
        position() {
            if (this[0]) {
                return this[0].getBoundingClientRect();
            } else {
                return false;
            }
        },
        prev: SDOM.prev,
        prepend: SDOM.prepend,
        remove() {
            this.forEach(function(x) {
                x.remove();
            });
        },
        removeClass: SDOM.removeClass,
        scrollAt(block, behavior) {
            if (!this[0]) return false;

            if (!block) {
                block = "start";
            }
            if (!behavior) {
                behavior = "smooth";
            }
            this[0].scrollIntoView({
                block: block,
                behavior: behavior
            });
            return this;
        },
        toggleClass: SDOM.toggleClass,
        val: SDOM.val,
        visible: SDOM.visible,
        width: SDOM.width,

        // ANIMATIONS
        in: SDOM.in,
        out: SDOM.out,
        animate: SDOM.animate
    };

    if (el) {
        if (el.length) {
            data.length = el.length;
            el.forEach((x, i) => {
                data[i] = x;
            });
        } else {
            data.length = 1;
            data["0"] = el;
        }
    }
    return data;
};

// AJAX REQUEST
const Request = function(url, data, header, type) {
    return new Promise(function(done, reject) {
        if (url) {
            var xhttp = new XMLHttpRequest();
            if (typeof type == "undefined") type = "post";
            if (typeof header == "undefined") header = "JSON";

            if (header.toUpperCase() == "JSON") {
                header = "application/x-www-form-urlencoded";
            } else if (header.toUpperCase() == "TEXT") {
                header = "text/html";
            }

            var _data = "",
                c = 0;
            if (typeof data === "object") {
                for (var key in data) {
                    if (c >= 1) {
                        _data += "&";
                    }
                    _data += key + "=" + data[key];
                    c++;
                }
            }

            xhttp.open(type.toUpperCase(), url, true);
            xhttp.setRequestHeader("Content-type", header);

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var res = this.responseText;
                        if (header === "application/x-www-form-urlencoded") {
                            try {
                                res = JSON.parse(res);
                            } catch (error) {}
                        }
                        done(res);
                    } else {
                        reject(this.statusText);
                    }
                }
            };
            xhttp.send(encodeURI(_data));
        }
    });
};

const Post = function(url, data, header) {
    return new Promise(function(done, reject) {
        Request(url, data, header, "post")
            .then(function(r) {
                done(r);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

const Get = function(url, data, header) {
    return new Promise(function(done, reject) {
        Request(url, data, header, "get")
            .then(function(r) {
                done(r);
            })
            .catch(function(e) {
                reject(e);
            });
    });
};

const Sdom = function() {
    const sdom = selector();

    // create ref selector
    sdom["0"] = true;
    sdom.length = 1;
    sdom.current = React.createRef().current;

    // ini list
    watch(sdom, "0", (a, b, c) => {
        return sdom.current;
    });

    return sdom;
};

export { Sdom, Get, Post };
