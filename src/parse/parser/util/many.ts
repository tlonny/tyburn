import { parse } from "@src/parse/parse"
import type {
    ParseInput,
    Parser,
    ParseResult,
} from "@src/parse/type"

export const parserUtilMany = <T>(parser : Parser<T>) => (
    input : ParseInput
) : ParseResult<T[]> => {
    const results : T[] = []
    let current = input

    while (true) {
        const result = parse(parser, current)
        if (result.resultType === "VALUE") {
            results.push(result.value)
            current = result.parsedInput
        } else if (result.resultType === "FATAL") {
            return result
        } else if (result.resultType === "ERROR") {
            break
        } else {
            result satisfies never
            throw new Error("Unexpected result type")
        }
    }

    return {
        resultType: "VALUE",
        parsedInput: current,
        value: results
    }
}
