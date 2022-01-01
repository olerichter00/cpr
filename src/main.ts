import { createBranchName } from "./createBranchName.ts"
import { createPRBody } from "./createPRBody.ts"
import { executeCommands } from "./executeCommands.ts"
import { printOverview } from "./printOverview.ts"
import { parseArguments } from "./parseArguments.ts"
import { BRANCH_PREFIX } from "./constants.ts"
import { cli } from "./cli.ts"

const main = async () => {
  const { args, options } = cli()

  const {
    ticketNumber,
    prTitle,
    prDescription: rowPrDescription,
  } = await parseArguments({ args, options })

  const branchName = createBranchName(BRANCH_PREFIX, ticketNumber, prTitle)

  let prDescription = rowPrDescription

  if (!prDescription) {
    prDescription = prTitle.includes(": ") ? prTitle.split(": ")[1] : prTitle
  }

  const prBody = await createPRBody(prTitle, ticketNumber, prDescription)

  await printOverview(prTitle, branchName, prDescription)

  await executeCommands(prTitle, branchName, prBody)
}

export default main
