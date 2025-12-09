import { parserUtilChar } from "@src/parse/parser/util/char"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserUtilMany } from "@src/parse/parser/util/many"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"

const parserSymbolCharInitial = parserUtilChar({
    name: "SYMBOL::INITIAL",
    test: (x) => /[a-zA-Z_]/.test(x)
})

const parserSymbolCharFollow = parserUtilChar({
    test: (x) => /[a-zA-Z0-9_]/.test(x),
    name: "SYMBOL::FOLLOW",
})

const parserDelim = parserWord("::")

export const parserSymbol = parserUtilMap(
    parserUtilSequence([
        parserSymbolCharInitial,
        parserUtilMany(parserSymbolCharFollow)
    ]),
    ([x, xs]) => [x, ...xs].join("")
)

export const parserSymbolQualified = parserUtilMap(
    parserUtilSequence([
        parserSymbol,
        parserUtilMany(
            parserUtilMap(
                parserUtilSequence([
                    parserDelim,
                    parserSymbol
                ]),
                ([x, xs]) => [x, ...xs].join("")
            )
        )
    ]),
    ([x, xs]) => [x, ...xs].join("")
)
