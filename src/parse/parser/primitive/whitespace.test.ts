import { parse } from "@src/parse/parse"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import type { ParseInput, ParseResultValue } from "@src/parse/type"
import { test, expect } from "bun:test"

test("parserWhitespace corrects parses whitespace characters", () => {
    const input : ParseInput = { data: "     hello", index: 0 }
    const result = parse(parserWhitespace, input) as ParseResultValue<null>
    expect(result.resultType).toBe("VALUE")
    expect(input.data.slice(result.parsedInput.index)).toEqual("hello")
})

test("parserWhitespace corrects handles zero whitespace", () => {
    const input : ParseInput = { data: "hello", index: 0 }
    const result = parse(parserWhitespace, input) as ParseResultValue<null>
    expect(result.resultType).toBe("VALUE")
    expect(input.data.slice(result.parsedInput.index)).toEqual("hello")
})
