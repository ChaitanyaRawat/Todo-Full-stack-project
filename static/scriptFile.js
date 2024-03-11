
function generateNewTodoItem(title,description,isDone) {
    console.log("entered")
    let todoItem = document.createElement("a")
    todoItem.classList.add("list-group-item", "list-group-item-action")
    let headNcheck = document.createElement("div")
    headNcheck.classList.add("d-flex", "w-100", "justify-content-between")
    let heading = document.createElement("h5")
    heading.classList.add("mb-1")
    heading.innerHTML = title
    let checkDiv = document.createElement("div")
    checkDiv.classList.add("form-check")
    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("btn","btn-danger","individual-delete-btn")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.style.display = "none"
    deleteBtn.onclick = "deleteThisTodo"
    deleteBtn.addEventListener("click",deleteThisTodo)
    let checkBox = document.createElement("input")
    checkBox.classList.add("form-check-input","individual-check-btn")
    checkBox.type = "checkbox"
    if(isDone){
        checkBox.click()
    }
    checkBox.addEventListener("click",checkTodo)
    let para = document.createElement("p")
    para.classList.add("mb-1")
    para.innerHTML = description


    checkDiv.appendChild(deleteBtn)
    checkDiv.appendChild(checkBox)
    headNcheck.appendChild(heading)
    headNcheck.appendChild(checkDiv)
    todoItem.appendChild(headNcheck)
    todoItem.appendChild(para)
    document.getElementById("todoList").appendChild(todoItem)

    // socket.emit("New-Todo-Item",{username: username , title:heading.innerHTML , description: para.innerHTML})
}

function deleteButton(target){
    let arr1 = document.getElementsByClassName("individual-delete-btn")
    let arr2 = document.getElementsByClassName("individual-check-btn")
    let size = arr1.length
    if(target.innerHTML == "Delete"){
        target.innerHTML = "Cancel Delete"
        for(let i = 0;i<size;i++){
            arr1[i].style.display = "inline"
            arr2[i].style.display = "none"
        }
    }else{
        target.innerHTML = "Delete"
        for(let i = 0;i<size;i++){
            arr2[i].style.display = "inline"
            arr1[i].style.display = "none"
        }
    }
}

function switchToAddMode(){
    let arr1 = document.getElementsByClassName("individual-delete-btn")
    let arr2 = document.getElementsByClassName("individual-check-btn")
    let deleteBtn = document.getElementById("mainDeleteButton")
    let size = arr1.length
    deleteBtn.innerHTML = "Delete"
    for(let i = 0;i<size;i++){
        arr2[i].style.display = "inline"
        arr1[i].style.display = "none"
    }
}

