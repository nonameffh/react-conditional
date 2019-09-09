(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = global || self, factory(global.ReactConditional = {}, global.React));
}(this, function (exports, React) { 'use strict';

    function normalize(value) {
        return typeof value === "function" ? value() : value;
    }
    class ForEach extends React.Component {
        render() {
            return this.props.for.map((item, index) => {
                return React.Children.map(this.props.children, (children) => {
                    return React.createElement(children["type"], Object.assign(Object.assign({}, children["props"]), { item: item, index: index }));
                });
            });
        }
    }
    class ForIn extends React.Component {
        render() {
            return Object.keys(this.props.for).map((k => {
                return React.Children.map(this.props.children, (children) => {
                    return React.createElement(children["type"], Object.assign(Object.assign({}, children["props"]), { item: this.props.for[k], index: k }));
                });
            }));
        }
    }
    class Case extends React.Component {
        render() {
            return this.props.children;
        }
    }
    class Default extends React.Component {
        render() {
            return this.props.children;
        }
    }
    class Switch extends React.Component {
        normalize(value) {
            return normalize(value);
        }
        render() {
            const matched = [];
            for (let child of React.Children.toArray(this.props.children)) {
                if (this.normalize(child["props"]["condition"]) === this.normalize(this.props.value) && child["type"] === Case) {
                    matched.push(child);
                    if (this.props.strict) {
                        return matched;
                    }
                }
                else if (child["type"] === Default) {
                    return child;
                }
            }
            return matched.length > 0 ? matched : null;
        }
    }
    Switch.defaultProps = { value: true, strict: true };
    class Then extends React.Component {
        render() {
            return this.props.children;
        }
    }
    class ElseIf extends React.Component {
        render() {
            return this.props.children;
        }
    }
    class Else extends React.Component {
        render() {
            return this.props.children;
        }
    }
    class If extends React.Component {
        normalize(value) {
            return normalize(value);
        }
        render() {
            for (let child of React.Children.toArray(this.props.children)) {
                if (this.normalize(this.props.condition) && child["type"] === Then) {
                    return child;
                }
                else if (this.normalize(child["props"]["condition"]) && child["type"] === ElseIf) {
                    return child;
                }
                else if (child["type"] === Else) {
                    return child;
                }
            }
            return null;
        }
    }

    exports.Case = Case;
    exports.Default = Default;
    exports.Else = Else;
    exports.ElseIf = ElseIf;
    exports.ForEach = ForEach;
    exports.ForIn = ForIn;
    exports.If = If;
    exports.Switch = Switch;
    exports.Then = Then;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
