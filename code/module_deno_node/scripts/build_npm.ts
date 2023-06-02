import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

// Empties the output folder
await emptyDir("./npm");

// Gets the version from the arguments
const version = Deno.args[0]

// Builds the package
await build({
  entryPoints: ["./lib/mod.ts"],
  outDir: "./npm",
  // Disables test files
  test: false,
  shims: {
    deno: true,
  },
  // Disables the inclusion of a UMD or CJS module
  scriptModule: false,
  // Creates a ESM module
  esModule: true,
  // package.json properties
  package: {
    name: "module_deno_node",
    version,
    description: "Shared module for Deno and Node",
    license: "MIT",
    type: "module",
    repository: {
      type: "git",
      url: "git+https://github.com/example/module_deno_node.git",
    },
    bugs: {
      url: "https://github.com/example/module_deno_node/issues",
    },
    // Publishes to GitHub Packages
    publishConfig: {
      registry: "https://npm.pkg.github.com",
    },
  },
});

// post build steps
Deno.copyFileSync("README.md", "npm/README.md");
