import type { ParserStatement } from "@src/parser/ast"
import type { ParserError } from "@src/parser/error"
import { parserExpr } from "@src/parser/expr"
import { parserBlock } from "@src/parser/statement/block"
import { parserAtomMapValue, parserAtomSequence, parserText, parserWhitespace, type Parser } from "astroparse"

const parseTokenWhile = parserText("while")
const parseTokenParensOpen = parserText("(")
const parseTokenParensClose = parserText(")")
const parseTokenBraceOpen = parserText("{")
const parseTokenBraceClose = parserText("}")

export const parserStatementWhile = (params : {
    parserStatement : Parser<ParserStatement, ParserError>
}) => parserAtomMapValue(
    parserAtomSequence([
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
    ([,,,, expr,,,,,, block]) : ParserStatement => ({
        statementType: "WHILE",
        condition: expr,
        block: block
    })
)
