export const loginQuery = (email,password) =>{
    return `
                mutation {
                    login(email: "${email}",password: "${password}"){
                        userId,
                        token
                        tokenExpiration
                    }
                }
            `
}

export const registerQuery = (fitstname,secondname,email,password) =>{
    return `
    mutation {
        register(registerInput: {
            firstname: "${fitstname}",
            secondname: "${secondname}",
            email: "${email}",
            password: "${password}",
        }){
            _id
            firstname
            secondname
        }
    }
`
}

export const getAllEvents = () => {
    return `
        query {
            events {
                _id
                title
                imageUrl
                description
                price
                date
                creator {
                    _id
                    firstname
                    secondname
                }
                bookings{
                    _id
                    user{
                        _id
                        firstname
                        secondname
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    `
}

export const createEvent = (title,description,imageUrl,price,date) => {
    return`
        mutation {
            createEvent(eventInput:{
                title: "${title}",
                imageUrl: "${imageUrl}",
                description: "${description}",
                price: ${price},
                date: "${date}"
            }){
                title
                imageUrl
                description
                price
                date
                creator{
                   firstname
                   secondname 
                }
                bookings{
                    _id
                    user{
                        _id
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    `
}

export const bookEvent = (eventId) => {
    return `
        mutation {
            bookEvent(eventId: "${eventId}"){
                title
                imageUrl
                description
                price
                date
                creator{
                   firstname
                   secondname 
                }
                bookings{
                    _id
                    user{
                        _id
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    `
}

export const cancelBooking = (eventId) => {
    return `
        mutation {
            cancelBooking(eventId: "${eventId}"){
                title
                imageUrl
                description
                price
                date
                creator{
                   firstname
                   secondname 
                }
                bookings{
                    _id
                    user{
                        _id
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    `
}

export const editEvent = (id,title,imageUrl,description,price,date) => {
    return`
        mutation {
            editEvent(eventId: "${id}", eventInput:{
                title: "${title}",
                imageUrl: "${imageUrl}",
                description: "${description}",
                price: ${price},
                date: "${date}"
            }){
                title
                imageUrl
                description
                price
                date
                creator{
                   firstname
                   secondname 
                }
                bookings{
                    _id
                    user{
                        _id
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    `
}

export const removeEvent = (eventId) => {
    return `
        mutation{
            deleteEvent(eventId: "${eventId}"){
                title
                imageUrl
                description
                price
                date
                creator{
                   firstname
                   secondname 
                }
                bookings{
                    _id
                    user{
                        _id
                    }
                    createdAt
                    updatedAt
                }
            }
        }
    `
}