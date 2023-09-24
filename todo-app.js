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

    function addToArray(obj, data) {
        let array = localStorage.getItem(data);
        
        array = array ? JSON.parse(array) : [];
        array.push(obj);
        localStorage.setItem(data, JSON.stringify(array));
    }
    
    function removeFromArray(id, data) {
        let array = JSON.parse(localStorage.getItem(data));

        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].id !== id) {
                newArray.push(array[i]);
            };
        };
        localStorage.setItem(data, JSON.stringify(newArray));
    }

    function itemIdCount() {
        let count = localStorage.getItem('itemIdCount');

        if (!count) {
            count = 1;
        } else { count++ };
        localStorage.setItem('itemIdCount', count);
        return count;
    }
    
    function createTodoApp(container, title = 'Список дел', dataTitle) {
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
            
            todoItem.doneButton.addEventListener('click', function(e) {
                let target = e.target.parentNode.parentNode;
                let elem = parseInt(target.id);
                let targetArray = JSON.parse(localStorage.getItem(dataTitle));
                let targetObject = targetArray.find(targetArray => targetArray.id === elem);
                
                if (targetObject.done === false) {
                    target.classList.toggle('list-group-item-success');
                    targetObject.done = true;
                } else {
                    target.classList.toggle('list-group-item-success');
                    targetObject.done = false;
                };

                for (let i in targetArray) {
                    if (targetArray[i].id === targetObject.id) {
                        targetArray.splice(i, 1, targetObject);
                    };
                };
                localStorage.setItem(dataTitle, JSON.stringify(targetArray));
            });

            todoItem.deleteButton.addEventListener('click', function(e) {
                if (confirm('Вы уверены?')) {
                    let target = e.target.parentNode.parentNode;
                    let elem = parseInt(target.id);
                    removeFromArray(elem);
                    target.remove();
                };
            });

            todoList.append(todoItem.item);
            
            objArrayItem = {
            };
            objArrayItem.id = itemIdCount();
            objArrayItem.name = todoItemForm.input.value; 
            objArrayItem.done = false;
            addToArray(objArrayItem, dataTitle);
            
            todoItemForm.input.value = '';
        });
    };

    window.createTodoApp = createTodoApp;
})();