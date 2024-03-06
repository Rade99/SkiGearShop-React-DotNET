import axios, { AxiosResponse } from "axios"
import { PaginatiedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "http://localhost:5000/api/"
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.request.use(congif => {
    const token = store.getState().account.user?.token;
    if (token) congif.headers.Authorization = `Bearer ${token}`;
    return congif;
})

axios.interceptors.response.use(async response => {
    //await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
        response.data = new PaginatiedResponse(response.data, JSON.parse(pagination));
        return response
    }
    return response;
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get("products", params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get("products/filters")
}

const TestErrors = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorised"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error")
};

const Basket = {
    get: () => requests.get("basket/GetBasket"),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
    updateItem: (productId: number, quantity: number) => requests.put(`basket?productId=${productId}&quantity=${quantity}`, {})
}

const Account = {
    login: (values: any) => requests.post("account/login", values),
    register: (values: any) => requests.post("account/register", values),
    currentUser: () => requests.get("account/currentUser")
}

const Orders = {
    list: () => requests.get("orders"),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post("orders", values)
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders
}

export default agent; 