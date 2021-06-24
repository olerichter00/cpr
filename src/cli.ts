import { cac } from "https://unpkg.com/cac/mod.ts"
const cacCli = cac("cpr")

export const cli = () => {
  const { args, options } = cacCli
    .option("-t, --ticket <ticket>", "Provide a ticket number or url")
    .option("-d, --description <description>", "Provide a PR description")
    .usage("<PR TITLE> [options]")
    .help()
    .parse()

  if (options.help) Deno.exit()

  return { args, options }
}
