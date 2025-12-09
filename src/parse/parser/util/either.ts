import { parse } from "@src/parse/parse"
import type { Parser, ParseInput, ParseResult } from "@src/parse/type"

type ParserUtilEitherParseResuleValue<TParsers extends readonly Parser<any>[]> =
   TParsers[number] extends Parser<infer TValue>
        ? TValue : never

export const parserUtilEither = <const TParsers extends readonly Parser<any>[]>(
    parsers: TParsers
) => (
        input : ParseInput
    ) : ParseResult<ParserUtilEitherParseResuleValue<TParsers>> => {
        let lastResult: ParseResult<ParserUtilEitherParseResuleValue<TParsers>> | null = null

        for (const parser of parsers) {
            const result = parse(parser, input)
            if (result.resultType !== "ERROR") {
                return result
            }

            lastResult = result
        }

        if (lastResult === null) {
            throw new Error("parserUtilEither is empty")
        }

        return lastResult
    }
