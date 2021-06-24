import { exec } from "https://deno.land/x/execute@v1.1.0/mod.ts"
import { promptString } from "./utils.ts"

export const printOverview = async (prTitle: string, branchName: string, prDescription: string) => {
  if (!prTitle) {
    console.error("\x1b[31m%s\x1b[0m", "Please provide a PR title.")
    Deno.exit(1)
  }

  console.log("\x1b[32m%s\x1b[0m", " Branch Name:", branchName)

  console.log("\x1b[32m%s\x1b[0m", " PR Title:", prTitle)

  console.log("\x1b[32m%s\x1b[0m", " PR Description:")
  console.log(prDescription)

  console.log("\x1b[32m%s\x1b[0m", " Included Files: ")

  console.log(await exec("git ls-files -m"))

  console.log("\n")

  let answer: any = undefined

  while (answer !== "y") {
    answer = await promptString("Do you want to continue? (y,N) ")

    if (answer === "n") Deno.exit(1)
  }

  console.log("\n")
}
