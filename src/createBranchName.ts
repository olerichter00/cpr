import { slugify } from "./utils.ts"

export const createBranchName = (branchPrefix: string, ticketNumber: string, prTitle: string) => {
  const prSlug = slugify(prTitle.split(": ").pop() as string)

  return `${branchPrefix}/${ticketNumber ? `${ticketNumber}/` : ""}${prSlug}`
}
