import { exec as execute } from "https://deno.land/x/execute@v1.1.0/mod.ts"
import { exec } from "https://deno.land/x/exec/mod.ts"

export const executeCommands = async (prTitle: string, branchName: string, prBody: string) => {
  await exec(`bit checkout -b ${branchName}`)

  await exec(`git add .`)

  const {
    status: { success: commitSuccess },
  } = await exec(`git commit -m "${prTitle}"`)

  if (!commitSuccess) {
    console.error("\x1b[31m%s\x1b[0m", "Couldn't commit changes.")
    Deno.exit(1)
  }

  console.log(`Pushing ${branchName}...`)
  const {
    status: { success: pushSuccess },
  } = await exec(`git push --set-upstream origin ${branchName} --no-verify`)

  if (!pushSuccess) {
    console.error("\x1b[31m%s\x1b[0m", "Couldn't push changes.")
    Deno.exit(1)
  }

  console.log(
    await execute({
      cmd: ["gh", "pr", "create", "--title", prTitle, "--body", prBody],
    }),
  )

  console.log(await exec("gh pr view -w"))

  // console.log("Switching to master")
  // await exec(`bit switch master`)
}
