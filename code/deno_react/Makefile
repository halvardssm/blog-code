bundle:
	deno bundle --config tsconfig.json index.tsx index.js
watch:
	deno bundle --watch index.tsx index.js
serve:
	deno run --allow-net --allow-read https://deno.land/std@0.129.0/http/file_server.ts .
dev:
	make -j 2 serve watch
