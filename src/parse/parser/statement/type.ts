import type { Expr } from "@src/parse/parser/expr/type"
import type { Typing } from "@src/parse/parser/typing"

export type StatementVariableDefinition = {
    statementType: "VARIABLE_DEFINITION",
    variable: string
    typing: Typing | null
    expression: Expr | null
}

export type StatementLoop = {
    statementType: "LOOP",
    statements: Statement[]
}

export type StatementComment = {
    statementType: "COMMENT"
    comment: string
}

export type Statement =
    | StatementComment
    | StatementLoop
    | StatementVariableDefinition
