const socket = io('http://localhost:3000');

let user = null

socket.on('update_messages', (messages) => {

    updateMessagesOnScreen(messages);

})

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>'

    messages.forEach(message => {
        list_messages += `<li id="${idLi()}"><p id="userName" style="color: ${randomColor()}" >${message.user}</p> <p id="message" >${message.msg}</p></li>`
    })

    list_messages += '</ul>'

    div_messages.innerHTML = list_messages
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#message_form')
    form.addEventListener('submit', (e) => {

        e.preventDefault();

        if(!user){
            alert('Defina um usuário');
            return;
        }

        const message = document.forms['message_form']['msg'].value
        document.forms['message_form']['msg'].value = ''

        socket.emit('new_message', { user: user, msg: message })

        console.log(message)


    })


    const userForm = document.querySelector('#user_form')
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        user = document.forms['user_form']['user'].value
        userForm.parentNode.removeChild(userForm)


    })
})

function randomColor(e){
    colors = ["#3772FF", "#F038FF", "#EF709D", "#39393A", "#422040", "#E57A44", "#B07BAC", "#1C2541", "#FF715B", "#9381FF"];

    let number = Math.floor(Math.random() * 10)

    return colors[number];
}


function idLi(){
    return Math.floor(Math.random() * 65536);
}