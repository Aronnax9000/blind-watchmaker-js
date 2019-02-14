function Album(name, session) {
    this.name = name
    this.session = session
    this.file = null
    this.biomorphs = []
    session.albums.push(this)
}



