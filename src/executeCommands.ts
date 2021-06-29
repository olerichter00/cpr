import { exec as execute } from "https://deno.land/x/execute@v1.1.0/mod.ts"
import { exec } from "https://deno.land/x/exec/mod.ts"

export const executeCommands = async (prTitle: string, branchName: string, prBody: string) => {
  await exec(`bit checkout -b ${branchName}`)

  await exec(`git add .`)
  await exec(`git commit -m "${prTitle}" --no-verify`)

  // TODO exit if fail

  console.log(`Pushing ${branchName}...`)
  await exec(`git push --set-upstream origin ${branchName} --no-verify`)

  console.log(
    await execute({
      cmd: ["gh", "pr", "create", "--title", prTitle, "--body", prBody],
    }),
  )

  console.log(await exec("gh pr view -w"))

  // console.log("Switching to master")
  // await exec(`bit switch master`)
}
