import { parse } from "@src/parse/parse"
import type { Parser, ParseInput, ParseResult } from "@src/parse/type"

export const parserUtilSequence = <T1, T2>(
    parserFirst : Parser<T1>,
    parserSecond: Parser<T2>
) => (input : ParseInput) : ParseResult<[T1, T2]> => {
        const resultFirst = parse(parserFirst, input)
        if (resultFirst.resultType !== "VALUE") {
            return resultFirst
        }

        const resultSecond = parse(parserSecond, resultFirst.parsedInput)
        if (resultSecond.resultType !== "VALUE") {
            return resultSecond
        }

        return {
            resultType: "VALUE",
            parsedInput: resultSecond.parsedInput,
            value: [resultFirst.value, resultSecond.value]
        }
    }
