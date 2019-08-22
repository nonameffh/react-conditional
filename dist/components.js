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
import * as React from "react";
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
        return this.props["for"].map(function (item, index) {
            return React.Children.map(_this.props.children, function (children) {
                return React.createElement(children["type"], __assign({}, children["props"], { item: item, index: index }));
            });
        });
    };
    return ForEach;
}(React.Component));
export { ForEach };
var ForIn = /** @class */ (function (_super) {
    __extends(ForIn, _super);
    function ForIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForIn.prototype.render = function () {
        var _this = this;
        return Object.keys(this.props["for"]).map((function (k) {
            return React.Children.map(_this.props.children, function (children) {
                return React.createElement(children["type"], __assign({}, children["props"], { item: _this.props["for"][k], index: k }));
            });
        }));
    };
    return ForIn;
}(React.Component));
export { ForIn };
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
export { Case };
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
export { Default };
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Switch.prototype.render = function () {
        var _this = this;
        var result = {
            matched: [],
            "default": null
        };
        React.Children.forEach(this.props.children, function (child) {
            if (child["type"] === Case && normalize(child["props"]["condition"]) === normalize(_this.props.value)) {
                result.matched.push(child);
            }
            else if (child["type"] === Default) {
                result["default"] = child;
            }
        });
        return result.matched.length > 0
            ? result.matched
            : result["default"];
    };
    Switch.defaultProps = { value: true };
    return Switch;
}(React.Component));
export { Switch };
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
export { Then };
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
export { ElseIf };
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
export { Else };
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    If.prototype.render = function () {
        var _this = this;
        var result = null;
        React.Children.forEach(this.props.children, function (child) {
            if (result) {
                return;
            }
            if (child["type"] === Then && normalize(_this.props.condition)) {
                return child;
            }
            else if (child["type"] === ElseIf && normalize(child["props"]["condition"])) {
                result = child;
            }
            else if (child["type"] === Else) {
                result = child;
            }
        });
        return result;
    };
    return If;
}(React.Component));
export { If };
//# sourceMappingURL=components.js.map