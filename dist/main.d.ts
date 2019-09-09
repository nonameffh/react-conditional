import * as React from "react";
export declare class ForEach extends React.Component<{
    for: Array<any>;
}, {}> {
    render(): React.ComponentElement<any, React.Component<any, any, any>>[][];
}
export declare class ForIn extends React.Component<{
    for: Object;
}, {}> {
    render(): React.ComponentElement<{
        item: any;
        index: string;
        children?: React.ReactNode;
    }, React.Component<{
        item: any;
        index: string;
        children?: React.ReactNode;
    }, any, any>>[][];
}
export declare class Case extends React.Component<{
    condition: any;
}, {}> {
    render(): React.ReactNode;
}
export declare class Default extends React.Component {
    render(): React.ReactNode;
}
export declare class Switch extends React.Component<{
    value: any;
    strict: boolean;
}, {}> {
    static defaultProps: {
        value: boolean;
        strict: boolean;
    };
    protected normalize(value: any): any;
    render(): {};
}
export declare class Then extends React.Component {
    render(): React.ReactNode;
}
export declare class ElseIf extends React.Component<{
    condition: any;
}> {
    render(): React.ReactNode;
}
export declare class Else extends React.Component {
    render(): React.ReactNode;
}
export declare class If extends React.Component<{
    condition: any;
}, {}> {
    protected normalize(value: any): any;
    render(): Then | ElseIf | Else;
}
