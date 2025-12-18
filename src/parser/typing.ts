import type { ParserTyping } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserSymbol } from "@src/parser/symbol"
import { parserAtomEither, parserAtomMany, parserAtomMapValue, parserAtomSequence, parserAtomTry, parserAtomValue, parserText, parserWhitespace, type ParseInput, type Parser } from "astroparse"

const parserTypingTokenOpen = parserText("<")
const parserTypingTokenClose = parserText(">")
const parserTypingTokenSeparator = parserText(",")

const parserTypingDeferred = (x : ParseInput) => parserTyping(x)

const parserTypingTypeArgs = parserAtomMapValue(
    parserAtomSequence([
        parserAtomTry(
            parserAtomSequence([
                parserWhitespace,
                parserTypingTokenOpen,
            ])
        ),
        parserWhitespace,
        parserAtomEither([
            parserAtomMapValue(parserTypingDeferred, x => [x]),
            parserAtomValue([])
        ]),
        parserAtomMany(
            parserAtomMapValue(
                parserAtomSequence([
                    parserAtomTry(
                        parserAtomSequence([
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

export const parserTyping : Parser<ParserTyping, ParserError> = parserAtomMapValue(
    parserAtomSequence([
        parserSymbol,
        parserAtomEither([
            parserTypingTypeArgs,
            parserAtomValue([])
        ])
    ]),
    ([sym, args]) => ({name: sym, arguments: args})
)
