import { promptString } from "./utils.ts"

export const parseArguments = async ({ args, options }: any) => {
  const ticketUrl = await parseOrPrompt("Ticket", options.ticket)

  const prTitle = await parseOrPrompt("PR Title", args.join(" "))

  const prDescription = await parseOrPrompt("PR Description", options.description)

  const ticketNumber = (ticketUrl.split("/").pop() as string).toUpperCase()

  return { ticketNumber, prTitle, prDescription }
}

const parseOrPrompt = async (prompt: string, parsed: string): Promise<string> => {
  return parsed || (await promptString(`${prompt}: `)) || ""
}
