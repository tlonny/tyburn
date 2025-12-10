import { parse } from "@src/parse/parse"
import { parserWord } from "@src/parse/parser/primitive/word"
import type {
    ParseInput,
    ParseResultError,
    ParseResultValue,
} from "@src/parse/type"
import { test, expect } from "bun:test"

test("parserWord correctly parses a target word", () => {
    const input : ParseInput = { data: "helloworld", index: 0 }
    const result = parse(parserWord("hello"), input) as ParseResultValue<string>
    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual("hello")
    expect(input.data.slice(result.parsedInput.index)).toEqual("world")
})

test("parserWord errors when target word doesn't match", () => {
    const input : ParseInput = { data: "helloworld", index: 0 }
    const result = parse(parserWord("hellp"), input) as ParseResultError
    expect(result.resultType).toBe("ERROR")
    expect(result.parsedInput.index).toEqual(0)
})
