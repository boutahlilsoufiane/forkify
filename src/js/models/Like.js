export class Like {

    constructor() {
        this.likes = []
    }

    addLike(id, title, timing, img) {
        const like = {
            id,
            title,
            timing,
            img
        }
        this.likes.push(like)
        this.persistLikes()
        return like
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id == id)
        this.likes.splice(index, 1)
        this.persistLikes()
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id == id) != -1
    }

    getNumLikes() {
        return this.likes.length
    }

    persistLikes() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    restoreLikes() {
        const item = localStorage.getItem('likes')
        if(item) this.likes = JSON.parse(item)
    }
}