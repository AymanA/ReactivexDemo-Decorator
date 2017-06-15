import 'reflect-metadata';

function loggerClass(target: any) {
    let original = target;
    for (let member in original.prototype) { // For each member of the dictionary
        if (typeof original.prototype[member] !== "function") { // Is it a function?
            continue;
        }
        if (!original.prototype.hasOwnProperty(member)) {
            continue;
        }

        // console.log(member)

        let originalFun = original.prototype[member];

        let wrappedFun : any = function (...args) {
            let arg = args.map(a => JSON.stringify(a)).join();
            let logMsg = `${target.name}.${member}(`;
            for(let arg in args) {
                logMsg += `param${arg}: ${args[arg]},`;
            }
            logMsg += `)`;
            console.log(logMsg); 
            return originalFun.apply(this, args)
        }
        original.prototype[member]= wrappedFun;
    }

    return target;    
}


function loggerMethod() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const types = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        var s = types.map(a => {
            return a.name
        }).join();
        console.log(`${propertyKey} param types: ${s}`);
    };
}

function log(target: any, key: string, value: any) {
    return {
        value: function (...args: any[]) {
            let arg = args.map(a => JSON.stringify(a)).join();
            let result = value.value.apply(this, args);
            let logMsg = `${key}(`;
            for(let arg in args) {
                logMsg += `param${arg}: ${args[arg]},`;
            }
            logMsg += `)`;
            console.log(logMsg);
            return result;
        }
    };
}



@loggerClass
class Person{
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
    }
    // @log
    // @loggerMethod()
    public test(param1:string, param2:number) : string {
        return param1 + " " + param2 ; 
    }
    // @log
    // @loggerMethod()
    public test2(param1:string, param2:string) : string {
        return param1 + " " + param2 ; 
    }
    // @log
    // @loggerMethod()
    public test3(param1:string, param2:number) : string {
        return param1 + " " + param2 ; 
    }
    // @log
    // @loggerMethod()
    public test4(param1:string, param2:string) : string {
        return param1 + " " + param2 ; 
    }
}



var p = new Person("remo", 30);
p.test("I love playing", 20);
p.test2("I love playing", "basketball");
p.test3("I love playing", 40);
p.test4("I love playing", "football");
