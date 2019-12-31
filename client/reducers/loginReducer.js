const initialState = {
    isLoggedIn: false,
    userID: ''
}

const LOGGED_IN = 'LOGGED_IN'
const LOGGED_OUT = 'LOGGED_OUT'

export const loginAction = (user) => ({ type: LOGGED_IN, userID: user.uid })
export const logoutAction = () => ({ type: LOGGED_OUT, userID: '' })

export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return {
                isLoggedIn: true,
                userID: action.userID
            }
        case LOGGED_OUT:
            return {
                isLoggedIn: false,
                userID: action.userID
            }
        default:
            return state
    }
}