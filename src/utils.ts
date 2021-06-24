import { readLines } from "https://deno.land/std@0.76.0/io/bufio.ts"
import { writeAll } from "https://deno.land/std/io/util.ts"
// import { slugify } from "https://deno.land/x/slugify/mod.ts"

export const slugify = (input: string): string => {
  let str = input
  str = str.replace(/^\s+|\s+$/g, "") // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
  var to = "aaaaeeeeiiiioooouuuunc------"
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return str
}

export const promptString = async (question: string) => {
  const text = new TextEncoder().encode(question)

  writeAll(Deno.stdout, text)

  for await (const line of readLines(Deno.stdin)) {
    return line
  }
}

export const promptMultilineString = async (question: string) => {
  const text = new TextEncoder().encode(question)

  writeAll(Deno.stdout, text)

  let result = ""

  for await (const line of readLines(Deno.stdin)) {
    result += line + "\n"

    if (result.includes("\n\n")) return result.replace("\n\n", "")
  }
}
