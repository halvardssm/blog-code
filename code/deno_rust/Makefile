run: build_wasm build_c
	deno run --allow-write --allow-env --allow-read --unstable --allow-ffi main.ts
build_wasm:
	cd rs_helpers_wasm && wasm-pack build --target web
build_c:
	cd rs_helpers_c && deno run --allow-env --allow-read --allow-write --allow-run https://deno.land/x/deno_bindgen/cli.ts --release
