import { useAuthStore } from '@/stores/auth.store.js';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH')
};

function request(method) {
    return (url, body=null, form=false) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            if (form) {
                let formBody = [];
                for (let property in body) {
                    let encodedKey = encodeURIComponent(property);
                    let encodedValue = encodeURIComponent(body[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                requestOptions.body = formBody.join("&");
                requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
            } else {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    let data = null;
    if (response.status !== 204 ){
        let isJson = response.headers?.get('content-type')?.includes('application/json');
        data = isJson ? await response.json() : null;
    }

    // check for error response
    if (!response.ok) {
        const { user, logout } = useAuthStore();

        if ([401, 403].includes(response.status) && user && !response.url.endsWith('/logout')) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    return data;
}
