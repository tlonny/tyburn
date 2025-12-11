import { parserExpr } from "@src/parse/parser/expr"
import { parserWhitespace } from "@src/parse/parser/primitive/whitespace"
import { parserWord } from "@src/parse/parser/primitive/word"
import { parserBlock } from "@src/parse/parser/statement/block"
import type { Statement } from "@src/parse/parser/statement/type"
import { parserUtilMap } from "@src/parse/parser/util/map"
import { parserUtilSequence } from "@src/parse/parser/util/sequence"
import type { Parser } from "@src/parse/type"

const parseTokenWhile = parserWord("while")
const parseTokenParensOpen = parserWord("(")
const parseTokenParensClose = parserWord(")")
const parseTokenBraceOpen = parserWord("{")
const parseTokenBraceClose = parserWord("}")

export const parserStatementWhile = (params : {
    parserStatement : Parser<Statement>
}) : Parser<Statement> => parserUtilMap(
    parserUtilSequence([
        parseTokenWhile,
        parserWhitespace,
        parseTokenParensOpen,
        parserWhitespace,
        parserExpr,
        parserWhitespace,
        parseTokenParensClose,
        parserWhitespace,
        parseTokenBraceOpen,
        parserWhitespace,
        parserBlock(params),
        parserWhitespace,
        parseTokenBraceClose,
    ]),
    ([,,,, expr,,,,,, block]) => ({
        statementType: "WHILE",
        condition: expr,
        statements: block
    })
)
