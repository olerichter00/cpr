run:
	deno run --allow-run --allow-net --allow-read --config tsconfig.json index.ts
test:
	deno test
format:
	deno fmt
debug:
	deno run --allow-run --allow-net --allow-read -A --inspect-brk index.ts
bundle:
	rm -rf build/
	mkdir build
	deno bundle index.ts build/index
compile:
	deno compile --allow-run --allow-net --allow-read index.ts

