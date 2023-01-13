export type CollectionNotesType = {
    id: number,
    title: string
}

export type NoteType = {
    id: number,
    description: string,
    date: string,
    collectionNotesId: number
}