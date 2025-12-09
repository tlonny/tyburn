import { parserSymbolQualified } from "@src/parse/parser/primitive/symbol"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilEither } from "@src/parse/parser/util/either"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import { parserUtilTry } from "@src/parse/parser/util/try"
import { parserUtilValue } from "@src/parse/parser/util/value"
import type { ParseInput, Parser } from "@src/parse/type"

export type Typing = {
    name: string
    arguments: Typing[]
}

const parserTypingTokenOpen = parserWord("<")
const parserTypingTokenClose = parserWord(">")
const parserTypingTokenSeparator = parserWord(",")

const parserTypingDeferred = (x : ParseInput) => parserTyping(x)

export const parserTypingTypeArgs : Parser<Typing[]> = parserUtilMap(
    parserUtilSequence([
        parserUtilTry(
            parserUtilSequence([
                parserWhitespace,
                parserTypingTokenOpen,
            ])
        ),
        parserWhitespace,
        parserUtilEither([
            parserUtilMap(parserTypingDeferred, x => [x]),
            parserUtilValue([])
        ]),
        parserUtilMany(
            parserUtilMap(
                parserUtilSequence([
                    parserUtilTry(
                        parserUtilSequence([
                            parserWhitespace,
                            parserTypingTokenSeparator
                        ])
                    ),
                    parserWhitespace,
                    parserTypingDeferred
                ]),
                ([,, x]) => x
            )
        ),
        parserWhitespace,
        parserTypingTokenClose
    ]),
    ([,, xs, ys]) => [...xs, ...ys]
)

export const parserTyping : Parser<Typing> = parserUtilMap(
    parserUtilSequence([
        parserSymbolQualified,
        parserUtilEither([
            parserTypingTypeArgs,
            parserUtilValue([])
        ])
    ]),
    ([sym, args]) => ({name: sym, arguments: args})
)
