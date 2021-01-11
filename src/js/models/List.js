import uniqid from 'uniqid'

export class List {
    constructor() {
        this.list = []
    }

    addItem(count, unit, description) {
        const item = {
            id: uniqid(),
            count,
            unit,
            description
        }
        this.list.push(item)
        return item
    }

    deleteItem(id) {
        const index = this.list.findIndex(el => el.id == id)
        this.list.splice(index, 1)
    }

    updateCount(id, count) {
        this.list.find(el => el.id == id).count = count
    }


}