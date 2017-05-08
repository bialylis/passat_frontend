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

export const deleteGroup = (xAuthToken, id) => getJsonData(
    fetch(`${origin}/auth/group/${id}`, {
        method: "DELETE",
        headers: prepareHeaders(xAuthToken)
    })
);

export const addMemberToGroup = (xAuthToken, groupId, userId) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/${userId}`, {
        method: "POST",
        headers: prepareHeaders(xAuthToken)
    })
);

export const removeMemberFromGroup = (xAuthToken, groupId, userId) => getJsonData(
    fetch(`${origin}/auth/group/${groupId}/${userId}`, {
        method: "DELETE",
        headers: prepareHeaders(xAuthToken)
    })
);

const prepareHeaders = (xAuthToken) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (xAuthToken) {
        headers.append('x-auth-token', xAuthToken);
    }
    return headers;
};

const getJsonData = jsonPromise => jsonPromise.then((response) => response.json());