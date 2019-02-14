function BiomorphFile(session, file) {
    this.session = session
    this.file = file
    if(file != null) {
        this.biomorphcount = file.size / session.serializationSize
    }
    this.data = null
}

function Album(name, session) {
    this.name = name
    this.session = session
    this.file = new BiomorphFile(session, null)
    this.biomorphs = []
    session.albums.push(this)
}



