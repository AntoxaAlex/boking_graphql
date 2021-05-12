export const loginQuery = () =>{
    return `
                mutation LoginUser($email: String!, $password: String!) {
                    login(email:$email, password:$password){
                        userId,
                        token
                        tokenExpiration
                    }
                }
            `
}

export const registerQuery = () =>{
    return `
    mutation RegisterUser($firstname: String!, $secondname: String!, $email: String!, $password: String!){
        register(registerInput: {
            firstname: $firstname,
            secondname: $secondname,
            email: $email,
            password: $password,
        }){
            userId,
            token
            tokenExpiration
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

export const createEvent = () => {
    return`
        mutation CreateEvent($title:String!, $description:String!, $imageUrl:String!, $price:Float!, $date: String!){
            createEvent(eventInput:{
                title: $title,
                imageUrl: $imageUrl,
                description: $description,
                price: $price,
                date: $date
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

export const bookEvent = () => {
    return `
        mutation BookEvent($id: ID!){
            bookEvent(eventId: $id){
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

export const cancelBooking = () => {
    return `
        mutation CancelBooking($id: ID!){
            cancelBooking(eventId: $id){
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

export const editEvent = () => {
    return`
        mutation EditEvent($id:ID!, $title:String!, $imageUrl:String!, $description:String!, $price:Float!, $date: String!){
            editEvent(eventId: $id, eventInput:{
                title: $title,
                imageUrl: $imageUrl,
                description: $description,
                price: $price,
                date: $date
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

export const removeEvent = () => {
    return `
        mutation RemoveEvent($id: ID!){
            deleteEvent(eventId: $id){
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