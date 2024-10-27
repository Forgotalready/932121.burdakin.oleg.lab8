'use strict';

class Model
{
    constructor() 
    {
        this.elements = []
    }

    addElement(element)
    {
        this.elements.push({key : element.key, value : element.value});
        render(this.elements.length, this.elements)
    }

    upElement(index)
    {
        if(index <= 0 || index == undefined)
            return

        const temp = this.elements[index]
        this.elements[index] = this.elements[index - 1]
        this.elements[index - 1] = temp
        render(this.elements.length, this.elements)
    }
    downElement(index)
    {
        if(index >= this.elements.length - 1 || index == undefined)
            return

        const temp = this.elements[index]
        this.elements[index] = this.elements[index + 1]
        this.elements[index + 1] = temp
        render(this.elements.length, this.elements)
    }

    deleteElement(index)
    {
        if(index < 0 || index == undefined || index >= this.elements.length)
            return

        this.elements.splice(index, 1)
        render(this.elements.length, this.elements)
    }

    save()
    {
        const main = document.querySelector('main')
        main.innerHTML += '<br>{'
        for(let i = 0; i < this.elements.length - 1; i++)
        {
            main.innerHTML += `"${this.elements[i].key}" : "${this.elements[i].value}",`
        }
        main.innerHTML += `"${this.elements[this.elements.length - 1].key}" : "${this.elements[this.elements.length - 1].value}"}`
        render(this.elements.length, this.elements)
    }
}

const render = (amount, elements) =>
{
    const container = document.querySelector('.container')
    container.innerHTML = ''

    for(let i = 0; i < amount; i++)
    {
        renderElement(elements[i], container, i)
    }
}

const renderElement = (element, container, index) =>
{
    const wrapper = document.createElement('div')
    const keyInput = document.createElement('input')
    const valueInput = document.createElement('input')
    const deleteButton = document.createElement('button')

    keyInput.className = 'keyInput'
    valueInput.className = 'valueInput'
    if(element != undefined)
    {
        keyInput.value = element.key
        valueInput.value = element.value
    }

    const upButton = document.createElement('button')
    upButton.addEventListener('click', () => model.upElement(index))
    const downButton = document.createElement('button')
    downButton.addEventListener('click', () => model.downElement(index))

    deleteButton.textContent = 'X'
    deleteButton.addEventListener('click', () => model.deleteElement(index))
    upButton.innerHTML = '&#8593;'
    downButton.innerHTML = '&#8595;'

    wrapper.appendChild(keyInput)
    wrapper.appendChild(valueInput)
    wrapper.appendChild(upButton)
    wrapper.appendChild(downButton)
    wrapper.appendChild(deleteButton)

    container.appendChild(wrapper)
}

const model = new Model()

document.querySelector('.createButton').addEventListener('click', () => renderElement(undefined, document.querySelector('.container')), undefined)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.target.classList.contains('keyInput') || event.target.classList.contains('valueInput'))) {
        event.preventDefault();

        const keyInputs = document.querySelectorAll('.keyInput');
        const valueInputs = document.querySelectorAll('.valueInput');
        const lastKey = keyInputs[keyInputs.length - 1].value;
        const lastValue = valueInputs[valueInputs.length - 1].value;

        model.addElement({ key: lastKey, value: lastValue });
    }
});

document.querySelector('.saveButton').addEventListener('click', () => model.save())
