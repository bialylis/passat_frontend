const origin = "https://pasat-backend.herokuapp.com";

export const loginUser = (username, password) => getJsonData(
    fetch(`${origin}/login`, {
        method: "POST",
        headers: prepareHeaders(),
        body: JSON.stringify({
            username,
            password
        })
    })
);

export const registerUser = (username, password, email) => getJsonData(
    fetch(`${origin}/register`, {
        method: "POST",
        headers: prepareHeaders(),
        body: JSON.stringify({
            username,
            password,
            email
        })
    })
);

export const fetchGroups = xAuthToken => getJsonData(
    fetch(`${origin}/auth/group`, {
        method: "GET",
        headers: prepareHeaders(xAuthToken)
    })
);

export const addGroup = (xAuthToken, name) => getJsonData(
    fetch(`${origin}/auth/group`, {
        method: "POST",
        headers: prepareHeaders(xAuthToken),
        body: JSON.stringify({
            name
        })
    })
);

export const getGroup = (xAuthToken, groupId) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}`, {
        method: "GET",
        headers: prepareHeaders(xAuthToken)
    })
);

export const deleteGroup = (xAuthToken, id) => getJsonData(
    fetch(`${origin}/auth/group/${id}`, {
        method: "DELETE",
        headers: prepareHeaders(xAuthToken)
    })
);

export const addMemberToGroup = (xAuthToken, groupId, email) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/member`, {
        method: "POST",
        headers: prepareHeaders(xAuthToken),
        body: JSON.stringify({
            invited_email: email
        })
    })
);

export const removeMemberFromGroup = (xAuthToken, groupId, userId) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/member/${userId}`, {
        method: "DELETE",
        headers: prepareHeaders(xAuthToken)
    })
);

export const getUserPublicKey = (xAuthToken, userId) => getRawData(
    fetch(`${origin}/auth/crypto/public/${userId}`, {
        method: "GET",
        headers: prepareHeaders(xAuthToken)
    })
);

export const generateKeys = (xAuthToken, encryption_pass) => getJsonData(
    fetch(`${origin}/auth/crypto`, {
        method: "POST",
        headers: prepareHeaders(xAuthToken),
        body: JSON.stringify({
            encryption_pass
        })
    })
);

export const getGroupPasswords = (xAuthToken, groupId) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/password`, {
        method: "GET",
        headers: prepareHeaders(xAuthToken)
    })
);

export const getGroupPassword = (xAuthToken, groupId, passId, privateKeyPassword) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/password/${passId}`, {
        method: "GET",
        headers: prepareHeaders(xAuthToken, privateKeyPassword)
    })
);


export const addGroupPasswordForUser = (xAuthToken, groupId, group, user, name, login, pass, note) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/password`, {
        method: "POST",
        headers: prepareHeaders(xAuthToken),
        body: JSON.stringify({
            group,
            user,
            pass_name: name,
            encrypted_login: login,
            encrypted_password: pass,
            note
        })
    })
);
export const deleteGroupPasswordsForUser = (xAuthToken, groupId, user) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/password/user/${user}`, {
        method: "DELETE",
        headers: prepareHeaders(xAuthToken)
    })
);

export const deletePass = (xAuthToken, passId, groupId) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/password`, { //TODO ALTER ENDPOINT
        method: "DELETE",
        headers: prepareHeaders(xAuthToken)
    })
);

/*export const resetPassword = (username, password, resetKey) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/password`, { //TODO ALTER ENDPOINT
        method: "POST",
        headers: prepareHeaders()
    })
);

export const sendResetEmail = (username) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/password`, { //TODO ALTER ENDPOINT
        method: "POST",
        headers: prepareHeaders()
    })
);*/

const prepareHeaders = (xAuthToken, privateKeyPassword) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(privateKeyPassword);
    if(privateKeyPassword){
        headers.append('key_password', privateKeyPassword);
    }
    if (xAuthToken) {
        headers.append('x-auth-token', xAuthToken);
    }

    return headers;
};

const getJsonData = jsonPromise => jsonPromise.then((response) => response.json());
const getRawData = promise => promise.then((response) => response.text());
