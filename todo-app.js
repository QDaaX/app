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
    
    
    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        let objArray = [];
        let count = 0;

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
                todoItem.item.classList.toggle('list-group-item-success');
                objArrayItem.done = true;
                for (let temp in objArray) {
                    if (objArray[temp].id === objArrayItem.id) {
                        objArray.splice(temp, 1, objArrayItem);
                    };
                };
            });

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    for (let temp in objArray) {
                        if (objArray[temp].id === objArrayItem.id) {
                            objArray.splice(temp, 1);
                        };
                    };
                };
            });

            todoList.append(todoItem.item);

            
            function objId() {
                count++;
                return count;
            };
            
            objArrayItem = {
            };
            objArrayItem.id = objId();
            objArrayItem.name = todoItemForm.input.value; 
            objArrayItem.done = false;
            objArray.push(objArrayItem);
            
            // alert(Object.values(objArray));
            todoItemForm.input.value = '';
        });
    };

    window.createTodoApp = createTodoApp;
})();