export type CreateNote = {
    description: string,
    date: string,
    collectionNotesId: number
}

export type CreateCollectionNotes = {
    title: string
}

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