"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function loggerClass(target) {
    var original = target;
    var _loop_1 = function (member) {
        if (typeof original.prototype[member] !== "function") {
            return "continue";
        }
        if (!original.prototype.hasOwnProperty(member)) {
            return "continue";
        }
        // console.log(member)
        var originalFun = original.prototype[member];
        var wrappedFun = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var arg = args.map(function (a) { return JSON.stringify(a); }).join();
            var logMsg = target.name + "." + member + "(";
            for (var arg_1 in args) {
                logMsg += "param" + arg_1 + ": " + args[arg_1] + ",";
            }
            logMsg += ")";
            console.log(logMsg);
            return originalFun.apply(this, args);
        };
        original.prototype[member] = wrappedFun;
    };
    for (var member in original.prototype) {
        _loop_1(member);
    }
    return target;
}
function loggerMethod() {
    return function (target, propertyKey, descriptor) {
        var types = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        var s = types.map(function (a) {
            return a.name;
        }).join();
        console.log(propertyKey + " param types: " + s);
    };
}
function log(target, key, value) {
    return {
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var arg = args.map(function (a) { return JSON.stringify(a); }).join();
            var result = value.value.apply(this, args);
            var logMsg = key + "(";
            for (var arg_2 in args) {
                logMsg += "param" + arg_2 + ": " + args[arg_2] + ",";
            }
            logMsg += ")";
            console.log(logMsg);
            return result;
        }
    };
}
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    // @log
    // @loggerMethod()
    Person.prototype.test = function (param1, param2) {
        return param1 + " " + param2;
    };
    // @log
    // @loggerMethod()
    Person.prototype.test2 = function (param1, param2) {
        return param1 + " " + param2;
    };
    // @log
    // @loggerMethod()
    Person.prototype.test3 = function (param1, param2) {
        return param1 + " " + param2;
    };
    // @log
    // @loggerMethod()
    Person.prototype.test4 = function (param1, param2) {
        return param1 + " " + param2;
    };
    return Person;
}());
Person = __decorate([
    loggerClass,
    __metadata("design:paramtypes", [String, Number])
], Person);
var p = new Person("remo", 30);
p.test("I love playing", 20);
p.test2("I love playing", "basketball");
p.test3("I love playing", 40);
p.test4("I love playing", "football");
//# sourceMappingURL=/home/ayman/djaty_workspace/sessions-presentations and demos/ReactiveX programming/decorator/decorator.js.map