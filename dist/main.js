"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function normalize(value) {
    return typeof value === "function" ? value() : value;
}
var ForEach = /** @class */ (function (_super) {
    __extends(ForEach, _super);
    function ForEach() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForEach.prototype.render = function () {
        var _this = this;
        return this.props.for.map(function (item, index) {
            return React.Children.map(_this.props.children, function (children) {
                return React.createElement(children["type"], __assign({}, children["props"], { item: item, index: index }));
            });
        });
    };
    return ForEach;
}(React.Component));
exports.ForEach = ForEach;
var ForIn = /** @class */ (function (_super) {
    __extends(ForIn, _super);
    function ForIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForIn.prototype.render = function () {
        var _this = this;
        return Object.keys(this.props.for).map((function (k) {
            return React.Children.map(_this.props.children, function (children) {
                return React.createElement(children["type"], __assign({}, children["props"], { item: _this.props.for[k], index: k }));
            });
        }));
    };
    return ForIn;
}(React.Component));
exports.ForIn = ForIn;
var Case = /** @class */ (function (_super) {
    __extends(Case, _super);
    function Case() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Case.prototype.render = function () {
        return this.props.children;
    };
    return Case;
}(React.Component));
exports.Case = Case;
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return this.props.children;
    };
    return Default;
}(React.Component));
exports.Default = Default;
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Switch.prototype.normalize = function (value) {
        return normalize(value);
    };
    Switch.prototype.render = function () {
        var matched = [];
        for (var _i = 0, _a = React.Children.toArray(this.props.children); _i < _a.length; _i++) {
            var child = _a[_i];
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
    };
    Switch.defaultProps = { value: true, strict: true };
    return Switch;
}(React.Component));
exports.Switch = Switch;
var Then = /** @class */ (function (_super) {
    __extends(Then, _super);
    function Then() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Then.prototype.render = function () {
        return this.props.children;
    };
    return Then;
}(React.Component));
exports.Then = Then;
var ElseIf = /** @class */ (function (_super) {
    __extends(ElseIf, _super);
    function ElseIf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElseIf.prototype.render = function () {
        return this.props.children;
    };
    return ElseIf;
}(React.Component));
exports.ElseIf = ElseIf;
var Else = /** @class */ (function (_super) {
    __extends(Else, _super);
    function Else() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Else.prototype.render = function () {
        return this.props.children;
    };
    return Else;
}(React.Component));
exports.Else = Else;
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    If.prototype.normalize = function (value) {
        return normalize(value);
    };
    If.prototype.render = function () {
        for (var _i = 0, _a = React.Children.toArray(this.props.children); _i < _a.length; _i++) {
            var child = _a[_i];
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
    };
    return If;
}(React.Component));
exports.If = If;
