serve_server:
	deno run --watch --allow-net server.ts
serve_client:
	deno run --allow-net --allow-read https://deno.land/std/http/file_server.ts .
watch_client:
	deno bundle --watch --config deno.client.jsonc client.tsx client.js
bundle_client:
	deno bundle --config deno.client.jsonc client.tsx client.js
dev:
	make -j 3 serve_server serve_client watch_client
