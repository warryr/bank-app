export default function decorator(f, name, toDecorate) {
    if(!toDecorate){
        return f;
    }
    return (...args) => {
        console.log(`'${name}' args`);
        console.log(args);
        let result = f(...args);
        console.log(`'${name}' result`);
        console.log(result);
        return result
    }
}