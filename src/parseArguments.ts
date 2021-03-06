import { promptMultilineString, promptString } from "./utils.ts"

export const parseArguments = async ({ args, options }: any) => {
  const ticketUrl = await parseOrPrompt("Ticket", options.ticket)

  let prTitle = await parseOrPrompt("PR Title", args.join(" "))

  const noVerify = options.verify === false

  const prDescription = await parseOrPrompt("PR Description", options.description, true)

  const ticketNumber = (ticketUrl.split("/").pop() as string).toUpperCase()

  return { ticketNumber, prTitle, prDescription, noVerify }
}

const parseOrPrompt = async (
  prompt: string,
  parsed: string,
  multiLine = false,
): Promise<string> => {
  const prompter = multiLine
    ? promptMultilineString.bind(null, `${prompt} [Enter 2 empty lines to finish]: `)
    : promptString.bind(null, `${prompt}: `)

  return parsed || (await prompter()) || ""
}
