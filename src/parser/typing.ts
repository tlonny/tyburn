import type { ParserNodeTyping } from "@src/parser/node"
import type { ParserError } from "@src/parser/error"
import { parserSymbol } from "@src/parser/symbol"
import { parserToken } from "@src/parser/token"
import { parserAtomEither, parserAtomMany, parserAtomMapValue, parserAtomSequence, parserAtomTry, parserAtomValue, parserWhitespace, type ParseInput, type Parser } from "astroparse"

const parserTypingTokenOpen = parserToken("<")
const parserTypingTokenClose = parserToken(">")
const parserTypingTokenSeparator = parserToken(",")

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

export const parserTyping : Parser<ParserNodeTyping, ParserError> = parserAtomMapValue(
    parserAtomSequence([
        parserSymbol,
        parserAtomEither([
            parserTypingTypeArgs,
            parserAtomValue([])
        ])
    ]),
    ([sym, args]) : ParserNodeTyping => ({
        nodeType: "TYPING",
        name: sym,
        arguments: args
    })
)
