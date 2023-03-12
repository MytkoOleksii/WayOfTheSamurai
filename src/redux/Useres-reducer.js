import {usersAPI} from "../API/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,       // відображае кількість користувачів на сторінці (яку порцію отримувати)
    totalUsersCount:0,// скільки пришло юзерів
    currentPage: 1,    // номер сторінки
    isFetching: true, // крутилка загрузки
    followingInProgress: [], //отключает кнопку

}

const usersReducer = (state = initialState,action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //   users: [...state.users],
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users }
           /* return {...state, users: [...state.users, ...action.users ]}*/
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return  {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return  {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                 followingInProgress: action.isFetching
                     ? [...state.followingInProgress, action.userID]
                     : state.followingInProgress.filter(id => id != action.userID)

            }
            }

        default:
            return state;
    }
}

  let followSuccess = (userID) => ( {type: FOLLOW, userID })
 let unfollowSuccess = (userID) => ( {type: UNFOLLOW, userID })
 let setUsers = (users) => ( {type: SET_USERS, users })
 let setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
 let setTotalCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT,totalCount})
 let toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
 let toggleFollowingProgress = (isFetching, userID) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID})

////////////////// Thunk  ///////////////////////////////////////////
export const getUsersThunkCreator = (currentPage, pageSize) => {
   return  (dispatch) => {
       dispatch(toggleIsFetching(true));
       dispatch(setCurrentPage(currentPage))


       usersAPI.getUsers(currentPage, pageSize)
           .then(data => {
               dispatch(toggleIsFetching(false));
               dispatch(setUsers(data.items));
               dispatch(setTotalCount(data.totalCount))
               // dispatch(setCurrentPage(currentPage))
           });
   }
}
export const follow = (userID) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userID));
        usersAPI.postUsersFollow(userID)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(followSuccess(userID))
                    }
                    dispatch(toggleFollowingProgress(false, userID))
                }
            )
    }
}
    export const unfollow = (userID) => {
        return (dispatch) => {
            dispatch(toggleFollowingProgress(true, userID));
            usersAPI.deleteUsersUnfollow(userID)
                .then(data => {
                        if (data.resultCode === 0) {
                            dispatch(unfollowSuccess(userID))
                        }
                        dispatch(toggleFollowingProgress(false, userID))
                    }
                )
        }
    }



export default usersReducer;




