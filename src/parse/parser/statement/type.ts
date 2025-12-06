
export type StatementComment = {
    statementType: "COMMENT"
    comment: string
}

export type Statement =
    | StatementComment
