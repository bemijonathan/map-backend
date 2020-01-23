let users = [

]

const AddNewUser = ({link, location, id}) => {

    console.log({link , location, id})
    users.push({
        link,
        location,
        id
    })
    let userwithLink = []
    users.forEach(e => {
        if(link === e.link){
            userwithLink.push(e)
        }
    })

    return { users:userwithLink }
}

const RemoveUser = (id) => {
    let singleUser = []
    users.forEach(e => {
        if (e.id !== id) {
            singleUser.push(e)
        }
    })

    if (singleUser.length !== users.length) {
        users = singleUser
        return { message: 'user removed' , users }
    } else {
        return { user: 'not removed', users  }
    }
}

const UpdateLocation = ({id, location, link}) => {
    users.forEach(e => { 
        if (e.id === id){ 
            e.location = location 
        }
    })

    let userwithLink = []

    users.forEach(e => {
        if(link === e.link){
            userwithLink.push(e)
        }
    })


    console.log(userwithLink)
    return {users:userwithLink}
}

const killLink = (link) => {
    let withoutlink = []
    users.forEach(e => {
        if(e.link !== link){
            withoutlink.push(e)
        }
    })
    users = withoutlink
}

const createLink = ({link , id, location}) => {

    console.log('creating link ', { link, id, location})
    
    let b = users.find(e => {
        return e.link === link
    })
    if(b){
        return {message: "link already exists"}
    }else{

        users.push({
            id, 
            location,
            link   
        })

        let u = users.filter(e => e.link === link)

        
        return {message: "link registered", users: u }
    }
}

module.exports = {
    createLink, UpdateLocation, killLink, createLink, AddNewUser, RemoveUser
}