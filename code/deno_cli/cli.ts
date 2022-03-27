import { parse } from "https://deno.land/std@0.130.0/flags/mod.ts";

const encoder = new TextEncoder();
const args = parse(Deno.args);

console.log(args);

if (!args.name) {
  await Deno.stdout.write(encoder.encode("The argument 'name' was not defined.\n"));
  Deno.exit(1);
}

const output = `Hello ${ args.name }\n`;

await Deno.stdout.write(encoder.encode(output));

Deno.exit(0);
