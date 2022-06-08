import { cli } from "./cli.ts"
import { BRANCH_PREFIX } from "./constants.ts"
import { createBranchName } from "./createBranchName.ts"
import { createPRBody } from "./createPRBody.ts"
import { executeCommands } from "./executeCommands.ts"
import { parseArguments } from "./parseArguments.ts"
import { printOverview } from "./printOverview.ts"

const main = async () => {
  const { args, options } = cli()

  const {
    ticketNumber,
    prTitle,
    prDescription: rowPrDescription,
    noVerify,
  } = await parseArguments({ args, options })

  const branchName = createBranchName(BRANCH_PREFIX, ticketNumber, prTitle)

  let prDescription = rowPrDescription

  if (!prDescription) {
    prDescription = prTitle.includes(": ") ? prTitle.split(": ")[1] : prTitle
    prDescription += "."
  }

  const prBody = await createPRBody(prTitle, ticketNumber, prDescription)

  await printOverview(prTitle, branchName, prDescription, noVerify)

  await executeCommands(prTitle, branchName, prBody, noVerify)
}

export default main
