export const getSender = (loggedUser, users) => {
    // console.log("loggedUser : ", loggedUser, " users : ", users)
    if (users[0]?._id === loggedUser?._id) {
        return `${users[1]?.firstName} ${users[1]?.lastName}`;
    } else {
        return `${users[0]?.firstName} ${users[0]?.lastName}`;
    }
}

export const getProfile = (loggedUser, users) => {
    console.log("loggedUser : ", loggedUser, " users : ", users)
    if (users[0]?._id === loggedUser?._id) {
        return `${users[1]?.image}`;
    } else {
        return `${users[0]?.image}`;
    }
}