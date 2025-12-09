import { parse } from "@src/parse/parse"
import { parserTyping, type Typing } from "@src/parse/parser/typing"
import type {
    ParseInput,
    ParseResultFatal,
    ParseResultValue,
} from "@src/parse/type"
import { test, expect } from "bun:test"

test("parserTyping parses type arguments while ignoring surrounding whitespace", () => {
    const input : ParseInput = {
        data: "Result  < Success ,Failure >tail",
        index: 0,
        position: [0, 0],
    }

    const result = parse(parserTyping, input) as ParseResultValue<Typing>

    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        name: "Result",
        arguments: [
            { name: "Success", arguments: [] },
            { name: "Failure", arguments: [] },
        ],
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual("tail")
})

test("parserTyping parses a primitive type that has no type arguments", () => {
    const input : ParseInput = {
        data: "Boolean trailing",
        index: 0,
        position: [0, 0],
    }

    const result = parse(parserTyping, input) as ParseResultValue<Typing>

    expect(result.resultType).toBe("VALUE")
    expect(result.value).toEqual({
        name: "Boolean",
        arguments: [],
    })
    expect(input.data.slice(result.parsedInput.index)).toEqual(" trailing")
})

test("parserTyping fatals when type argument parentheses never close", () => {
    const input : ParseInput = {
        data: "Option<Value",
        index: 0,
        position: [0, 0],
    }

    const result = parse(parserTyping, input) as ParseResultFatal

    expect(result.resultType).toBe("FATAL")
})

test("parserTyping fatals when there's a trailing comma in the type arguments list", () => {
    const input : ParseInput = {
        data: "Option<Value, >",
        index: 0,
        position: [0, 0],
    }

    const result = parse(parserTyping, input) as ParseResultFatal

    expect(result.resultType).toBe("FATAL")
})
