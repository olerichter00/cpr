export const prTypes: any = {
  feature: "Feature",
  feat: "Feature",
  fix: "Bugfix",
  enhancement: "Enhancement",
  documentation: "Documentation",
}

const TYPE_PLACEHOLDER = "TYPE"
const DESCRIPTION_PLACEHOLDER = "<!-- Implementation description -->"

export const createPRBody = async (
  prTitle: string,
  ticketNumber: string,
  prDescription: string,
) => {
  let prBody = ticketNumber ? "Addresses []" : ""

  try {
    prBody = await Deno.readTextFile("./docs/pull_request_template.md")
  } catch {}

  prBody = prBody.replace("[]", `[${ticketNumber}]`)

  if (!ticketNumber && prBody.includes("This PR resolves []")) {
    prBody.replace("This PR resolves []", "")
  }

  const type = prTitle.split(":")[0]

  if (type && !type.includes(" ")) {
    prBody = prBody.replace(TYPE_PLACEHOLDER, prTypes[type] || type)
  }

  if (prDescription) {
    if (prBody.includes(DESCRIPTION_PLACEHOLDER)) {
      prBody = prBody.replace(DESCRIPTION_PLACEHOLDER, prDescription)
    } else {
      prBody += "\n\n"
      prBody += "## Description" + "\n\n"
      prBody += prDescription
    }
  }

  return prBody
}
