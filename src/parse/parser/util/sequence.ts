import { parse } from "@src/parse/parse"
import type { Parser, ParseInput, ParseResult } from "@src/parse/type"

type ParserUtilSequenceParseResultValue<TParsers extends readonly Parser<any>[]> = {
    [TIndex in keyof TParsers]: TParsers[TIndex] extends Parser<infer TValue>
        ? TValue : never
}

export const parserUtilSequence = <const TParsers extends readonly Parser<any>[]>(
    parsers : TParsers
) => (
        input : ParseInput
    ) : ParseResult<ParserUtilSequenceParseResultValue<TParsers>> => {
        let currentInput = input
        const values: unknown[] = []

        for (const parser of parsers) {
            const result = parse(parser, currentInput)
            if (result.resultType !== "VALUE") {
                return result
            }

            values.push(result.value)
            currentInput = result.parsedInput
        }

        return {
            resultType: "VALUE",
            parsedInput: currentInput,
            value: values as ParserUtilSequenceParseResultValue<TParsers>
        }
    }
