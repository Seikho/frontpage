import * as ko from 'knockout'
import * as fs from 'fs'
import state from '../state'

class Taxonomy {
    selected = state.selectedTaxonomy
    available = state.taxonomy
    taxonomyInput = ko.observable('')

    autocompleteList = ko.computed(() => {
        const input = this.taxonomyInput()
        if (input.length === 0) {
            return []
        }
        const selected = this.selected()

        const list = this.available()
            .filter(item => item.indexOf(input) > -1)
            .filter(item => selected.every(sel => sel !== item))

        return list
    })

    addItem = (topic: string) => {
        this.selected.push(topic)
        this.taxonomyInput('')
    }

    removeItem = (topic: string) => {
        this.selected.remove(item => item === topic)
    }
}

const viewModel = new Taxonomy()

ko.components.register('ko-taxonomy', {
    template: fs.readFileSync(`${__dirname}/taxonomy.html`).toString(),
    viewModel: {
        createViewModel: () => viewModel
    }
})