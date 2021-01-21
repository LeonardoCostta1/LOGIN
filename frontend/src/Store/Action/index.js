
export function validatedUser(valid){
    return{
        type:'AUTHENTICATED',
        payload:valid
    }
}

export function getUser(user){
    return{
        type:'GET_USER',
        payload:user
    }
}