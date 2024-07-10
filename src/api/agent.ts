import { AxiosResponse } from "axios";

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: Activity) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: Activity) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
};