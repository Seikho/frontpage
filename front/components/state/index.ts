import * as ko from 'knockout'

class State {
    taxonomy = ko.observableArray<string>([])
    selectedTaxonomy = ko.observableArray<string>([])
    page = ko.observable(1)
    content = ko.observableArray<Publication>([])
    fetching = ko.observable(false)

    constructor() {
        this.getTaxonomy()
    }

    getTaxonomy = async () => {
        const json = await fetch('/taxonomy')
            .then(res => res.json()) as Taxonomy

        const taxonomy = json.map(item => item.id)

        this.taxonomy.destroyAll()
        this.taxonomy.push(...taxonomy)
    }

    getContent = async () => {
        this.fetching(true)
        try {
            const page = this.page()
            const topics = this.selectedTaxonomy()
                .map(topic => `topics=${topic}`)
                .join('&')
            const json = await fetch(`/taxonomy?page=${page}&${topics}`)
                .then(res => res.json()) as Publication[]

            if (page === 1) {
                this.content.destroyAll()
            }

            this.content.push(...json)
        } finally {
            this.fetching(false)
        }
    }

    refresh = () => {
        this.page(1)
        this.getContent()
    }

    next = () => {
        const page = this.page() + 1
        this.page(page)
        this.getContent()
    }
}

const state = new State()

export default state