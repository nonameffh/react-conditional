import * as React from "react";

function normalize(value) {
    return typeof value === "function" ? value() : value;
}

export class ForEach extends React.Component<{ for: Array<any> }, {}> {
    public render() {
        return this.props.for.map((item, index) => {
            return React.Children.map(this.props.children, (children) => {
                return React.createElement(children["type"], {...children["props"], item: item, index: index});
            });
        });
    }
}

export class ForIn extends React.Component<{ for: Object }, {}> {
    public render() {
        return Object.keys(this.props.for).map((k => {
            return React.Children.map(this.props.children, (children: React.Component) => {
                return React.createElement(children["type"], {...children["props"], item: this.props.for[k], index: k});
            });
        }));
    }
}

export class Case extends React.Component<{ condition: any }, {}> {
    public render() {
        return this.props.children;
    }
}

export class Default extends React.Component {
    public render() {
        return this.props.children;
    }
}

export class Switch extends React.Component<{ value: any, strict: boolean }, {}> {
    public static defaultProps = {value: true, strict: true};

    protected normalize(value) {
        return normalize(value);
    }

    public render() {
        const matched: Array<Case> = [];

        for (let child of React.Children.toArray(this.props.children)) {
            if (this.normalize(child["props"]["condition"]) === this.normalize(this.props.value) && child["type"] === Case) {
                matched.push(child as Case);

                if (this.props.strict) {
                    return matched;
                }
            } else if (child["type"] === Default) {
                return child;
            }
        }

        return matched.length > 0 ? matched : null;
    }
}

export class Then extends React.Component {
    public render() {
        return this.props.children;
    }
}

export class ElseIf extends React.Component<{ condition: any }> {
    public render() {
        return this.props.children;
    }
}

export class Else extends React.Component {
    public render() {
        return this.props.children;
    }
}

export class If extends React.Component<{ condition: any }, {}> {
    protected normalize(value) {
        return normalize(value);
    }

    public render() {
        for (let child of React.Children.toArray(this.props.children)) {
            if (this.normalize(this.props.condition) && child["type"] === Then) {
                return child as Then;
            } else if (this.normalize(child["props"]["condition"]) && child["type"] === ElseIf) {
                return child as ElseIf;
            } else if (child["type"] === Else) {
                return child as Else;
            }
        }

        return null;
    }
}
