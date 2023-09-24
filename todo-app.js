(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.setAttribute('disabled', 'disabled');

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem({name, done}) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        item.id = JSON.parse(localStorage.getItem('itemIdCount')) + 1;

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = arguments[0];

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
        
    };

    function addToArray(obj) {
        let array = localStorage.getItem('arrayData');
        
        array = array ? JSON.parse(array) : [];
        array.push(obj);
        localStorage.setItem('arrayData', JSON.stringify(array));
    }
    
    function removeFromArray(id) {
        let array = JSON.parse(localStorage.getItem('arrayData'));

        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].id !== id) {
                newArray.push(array[i]);
            };
        };
        localStorage.setItem('arrayData', JSON.stringify(newArray));
    }

    function itemIdCount() {
        let count = localStorage.getItem('itemIdCount');

        if (!count) {
            count = 1;
        } else { count++ };
        localStorage.setItem('itemIdCount', count);
        return count;
    }
    
    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.form.addEventListener('input', function() {
            todoItemForm.button.removeAttribute('disabled');
        });

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!todoItemForm.input.value) {
                return;
            }
            
            let todoItem = createTodoItem(todoItemForm.input.value);
            
            todoItem.doneButton.addEventListener('click', function() {
                if (objArrayItem.done === false) {
                    todoItem.item.classList.toggle('list-group-item-success');
                    objArrayItem.done = true;
                } else {
                    todoItem.item.classList.toggle('list-group-item-success');
                    objArrayItem.done = false;
                };
                let array = JSON.parse(localStorage.getItem('arrayData'));
                for (let temp in array) {
                    if (array[temp].id === objArrayItem.id) {
                        array.splice(temp, 1, objArrayItem);
                    };
                };
                localStorage.setItem('arrayData', JSON.stringify(array));
            });

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    removeFromArray(objArrayItem.id);
                    todoItem.item.remove();
                };
            });

            todoList.append(todoItem.item);
            
            objArrayItem = {
            };
            objArrayItem.id = itemIdCount();
            objArrayItem.name = todoItemForm.input.value; 
            objArrayItem.done = false;
            addToArray(objArrayItem);
            
            todoItemForm.input.value = '';
        });
    };

    window.createTodoApp = createTodoApp;
})();