/// <reference no-default-lib="true" />
/// <reference lib="deno.worker" />

self.onmessage = ({data}) => {
  console.log("inside worker start");
//   console.log(data);
//   self.postMessage("message from worker");
  console.log("inside worker end");
};

self.onerror=(e)=>{
    console.error(e)
}

self.onmessageerror=(e)=>{
    console.error(e)
}
