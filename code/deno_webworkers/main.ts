/// <reference lib="deno.unstable" />

async function main() {
  console.log("before worker");
  const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
    type: "module",
    deno: {
      namespace: true,
    },
  });
  worker.onmessage=(e) => {
    console.log(e);
  };
  worker.onerror=(e)=>{
      console.error(e)
  }
  worker.onmessageerror=(e)=>{
      console.error(e)
  }
  worker.postMessage("message from main");
  console.log("after worker");
}
await main();
