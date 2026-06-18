const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    data?: unknown;
    auth?: boolean;
    headers?: Record<string, string>;
    query?: Record<string, string | number | boolean>;
};

export type ApiResponse<T> = {
    ok: boolean,
    status: number,
    data: T,
}

const call = async <T = any>(route: string, options: RequestOptions): Promise<ApiResponse<T> | null> => {
    const {
        method = "GET",
        data,
        auth = true,
        headers = {},
        query = {}
    } = options;

    const config: RequestInit = {
        method,
        headers: {
            Accept: "application/json",
            ...headers
        },
        ...(auth && {credentials: 'include'})
    }

    if(data instanceof FormData) {
        config.body = data;
    } else if(data) {
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
        };
        config.body = JSON.stringify(data);
    };

    let url = `${BASE_API_URL}${route}`;

    if(query) {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            params.append(key, String(value));
        });

        url += `?${params.toString()}`;
    }

    const res = await fetch(url, config);

    if(res.status === 401  && auth){
        window.dispatchEvent(new Event("unauthorized"));

        return null;
    }

    const json = await res.json();

    if(res.status === 400) {
        return {
            ok: false,
            status: res.status,
            data: json
        };
    };

    if(!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
    };

    return {
        ok: res.ok,
        status: res.status,
        data: json
    };
};

export const Request = {
    get: <T = any>(route: string, options?: RequestOptions) => 
        call<T>(route, {...options, method: "GET"}),

    post: <T = any>(route: string, data?: unknown, options?: RequestOptions) =>
        call<T>(route, {...options, method: "POST", data}),

    put: <T = any>(route: string, data?: unknown, options?: RequestOptions) =>
        call<T>(route, {...options, method: "PUT", data}),

    patch: <T = any>(route: string, data?: unknown, options?: RequestOptions) =>
        call<T>(route, {...options, method: "PATCH", data}),

    delete: <T = any>(route: string, options?: RequestOptions) => 
        call<T>(route, {...options, method: "DELETE"}),
}

