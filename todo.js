
const firebaseConfig = {
apiKey: "AIzaSyDCo6FZvdp4_7tRSghXXGfBYXJBOnlliM4",
authDomain: "todo-app-d8772.firebaseapp.com",
databaseURL: "https://todo-app-d8772-default-rtdb.firebaseio.com",
projectId: "todo-app-d8772",
storageBucket: "todo-app-d8772.appspot.com",
messagingSenderId: "555677487920",
appId: "1:555677487920:web:69f4bb9e3a2445cb4e2ef5"
};
const app = firebase.initializeApp(firebaseConfig);
console.log(app.database)


var database = app.database()

var listBox = document.getElementById("listBox")
function addTodo() {
    var input = document.getElementById("input")


    if (input.value.length > 2) {

        var key = database.ref("/").push().key

        var todoObj = {
            key : key,
            todo : input.value
        }

        database.ref("todos").child(key).set(todoObj)



        

        input.value = ""

    } else {
        alert("enter correct value")
    }




}


database.ref("todos").on("child_added" , function(data){
            console.log(data.val().key)
            ///create element and li text//
        var li = document.createElement("li")
        var liTxt = document.createTextNode(data.val().todo)


        li.appendChild(liTxt)

        var editBtn = document.createElement("button")
        editBtn.innerHTML =  '<i class="fas fa-edit"></i>'
        editBtn.setAttribute("onclick", "editList(this)")
        editBtn.setAttribute("id" , data.val().key)
        li.appendChild(editBtn)
        var delBtn = document.createElement("button")
        delBtn.innerHTML = '<i class="fas fa-minus-circle"></i>'
        delBtn.setAttribute("onclick", "delList(this)")
        delBtn.setAttribute("id" , data.val().key)
        li.appendChild(delBtn)

        listBox.appendChild(li)
})


function deltodo(){
            listBox.innerHTML = ""
            database.ref("/todos").remove()

        }

function editList(e){
    var litxt = e.parentNode.firstChild.nodeValue
    var editLiTxt = prompt("EDIT TODO" , litxt )
    console.log(editLiTxt)
    e.parentNode.firstChild.nodeValue = editLiTxt

    console.log(e.id)
    database.ref("todos").child(e.id).update({
        todo : editLiTxt
    })
}


function delList(e){
    console.log(e.parentNode)
    e.parentNode.remove()
    console.log(e.id)
    database.ref("todos").child(e.id).remove()
}