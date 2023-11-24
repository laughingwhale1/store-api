import axios from "axios";
import {ApiResponse} from "../types/api.types.ts";
import {intercept} from "./axios.ts";
import {setBearerToken} from "@/utils/setBearerToken.ts";


type KeyValue<U> = {
    [key: string]: U;
};

intercept();

class API<T> {
    async get(url: string, params: any, headers: KeyValue<string> = {}) {
        setBearerToken()
        const response = await axios
            .get(url, {
                params,
                headers: {
                    ...headers,
                },
            })
            .catch(err => {
                return { data: err.response.data };
            });
        return response.data;
    }

    async post(
        url: string,
        body: T,
        headers: KeyValue<string> = {},
    ): Promise<ApiResponse<any>> {
        setBearerToken()
        const response = await axios
            .post(url, body, {
                headers: {
                    ...headers,
                },
            })
            .catch(err => ({ data: err.response.data }));
        return response.data;
    }

    async put(url: string, body: T, headers: KeyValue<string> = {}) {
        setBearerToken()
        const response = await axios
            .put(url, body, {
                headers: {
                    ...headers,
                },
            })
            .catch(err => ({
                data: err.response.data,
            }));
        return response.data;
    }

    async patch(url: string, body: T, headers: KeyValue<string> = {}) {
        setBearerToken()
        const response = await axios
            .patch(url, body, {
                headers: {
                    ...headers,
                },
            })
            .catch(err => ({
                data: err.response.data,
            }));
        return response.data;
    }

    async delete(url: string, body?: T, headers: KeyValue<string> = {}) {
        setBearerToken()
        const response = await axios
            .delete(url, {
                data: body,
                headers,
            })
            .catch(err => ({
                data: err.response.data,
            }));
        return response.data;
    }
}

export default new API();
