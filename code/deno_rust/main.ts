import init, { fibonacci as fibonacciWasm } from "./rs_helpers_wasm/pkg/rs_helpers_wasm.js";
import { fibonacci as fibonacciC } from "./rs_helpers_c/bindings/bindings.ts";

const FIBONACCI_NUMBER = 43;

await init();

function fibonacci(x: number): number {
  if (x === 0) {
    return 0;
  }

  if (x === 1) {
    return 1;
  }

  return fibonacci(x - 1) + fibonacci(x - 2);
}

function timeJs() {
  console.time("js");
  console.log(fibonacci(FIBONACCI_NUMBER));
  console.timeEnd("js");
}

function timeWasm() {
  console.time("wasm");
  console.log(fibonacciWasm(FIBONACCI_NUMBER));
  console.timeEnd("wasm");
}

function timeC() {
  console.time("c");
  console.log(fibonacciC(FIBONACCI_NUMBER));
  console.timeEnd("c");
}

timeJs();
timeWasm();
timeC()
