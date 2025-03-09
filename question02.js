function createFunctionRegistry() {
    const registry = {};

    return {
        registerFunction(name, fn){
            registry[name] = fn;
        },
        executeFunction(name, args = [], context = null) {
            return registry[name].apply(context, args);
        },
        mapFunction(name, dataArray) {
            return dataArray.map(item => registry[name](item));
        },
        filterFunction(name, dataArray){
            return dataArray.filter(item => registry[name](item));
        },

        reduceFunction(name, dataArray, initialValue){
            return Array.reduce(registry[name], initialValue);
        },
        executeFunctionAsync(name, args = [], delay){
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(registry[name].apply(null, args));
                }, delay);
            });
        },

        exportRegistry(){
            return JSON.stringify(Object.keys(registry));
        }
    };
}
const registry = createFunctionRegistry();
registry.registerFunction("double", x => x * 2);
console.log(registry.executeFunction("double", [5]));

registry.executeFunctionAsync("double", [4], 2000).then(console.log);

