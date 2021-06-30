import { createBranchName } from "./createBranchName.ts"
import { createPRBody } from "./createPRBody.ts"
import { executeCommands } from "./executeCommands.ts"
import { printOverview } from "./printOverview.ts"
import { parseArguments } from "./parseArguments.ts"
import { BRANCH_PREFIX } from "./constants.ts"
import { cli } from "./cli.ts"
import { isOnMainBranch, switchBackToMainBranch } from "./utils.ts"

const main = async () => {
  const { args, options } = cli()

  if (!(await isOnMainBranch())) {
    console.error("\x1b[31m%s\x1b[0m", "You're not on the main branch.")

    await switchBackToMainBranch()

    // add something

    if (!(await isOnMainBranch())) {
      Deno.exit(1)
    }
  }

  const { ticketNumber, prTitle, prDescription } = await parseArguments({ args, options })

  const branchName = createBranchName(BRANCH_PREFIX, ticketNumber, prTitle)

  const prBody = await createPRBody(prTitle, ticketNumber, prDescription)

  await printOverview(prTitle, branchName, prDescription)

  await executeCommands(prTitle, branchName, prBody)
}

export default main
