"use strict"

const todoControl = document.querySelector('.todo-control')
const todoList = document.querySelector('.todo-list')
const todocompleted = document.querySelector('.todo-completed')
const headerInput = document.querySelector('.header-input')

let todoData = []

const setLocalStor = (data) => {
    const dataString = JSON.stringify(data)
    localStorage.setItem('todo', dataString)
}

const render = () => {
    todoList.innerHTML = ''
    todocompleted.innerHTML = ''

    todoData.forEach((item, index) => {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        if (item.completed) {
            todocompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed
            render()
        })
        li.querySelector('.todo-remove').addEventListener('click', () => {
            todoData.splice(index,  index === 0 ? index = 1 : index)
            render()
        })
    })

    setLocalStor(todoData)
}

const getDataLocalStor = () => {
    const dataString = localStorage.getItem('todo')
    todoData = JSON.parse(dataString) || []

    render()
}

getDataLocalStor()

todoControl.addEventListener('submit', (e) => {
    e.preventDefault()
    if (headerInput.value !== '') {
        const newTodo = {
            text: headerInput.value,
            completed: false
        }

        todoData.push(newTodo)
        headerInput.value = ''

        render()
    } else{
        alert('заполните поле')
    }
})