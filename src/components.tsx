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

export class Switch extends React.Component<{ value: any }, {}> {
    public static defaultProps = {value: true};

    public render() {
        const result = {
            matched: [],
            default: null
        } as {
            matched: Array<Case>,
            default: Default | null
        };

        React.Children.forEach(this.props.children, child => {
            if (child["type"] === Case && normalize(child["props"]["condition"]) === normalize(this.props.value)) {
                result.matched.push(child as Case);
            } else if (child["type"] === Default) {
                result.default = child as Default;
            }
        });

        return result.matched.length > 0
               ? result.matched
               : result.default;
    }
}

export class Then extends React.Component {
    public render() {
        return this.props.children;
    }
}

export class ElseIf extends React.Component<{condition:any}> {
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
    public render() {
        let result : Then|ElseIf|Else|null = null;

        React.Children.forEach(this.props.children, child => {
            if (result) {
                return;
            }

            if (child["type"] === Then && normalize(this.props.condition)) {
                return child as Then;
            } else if (child["type"] === ElseIf && normalize(child["props"]["condition"])) {
                result = child as ElseIf;
            } else if (child["type"] === Else) {
                result = child as Else;
            }
        });

        return result;
    }
}
