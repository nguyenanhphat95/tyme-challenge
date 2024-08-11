import { HTTP_STATUS } from "./constants";
import { CustomOptionsType } from "./types";
import { isFormData } from "./utils";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptionsType
) => {
  try {
    let body: FormData | string | undefined = undefined;

    if (options?.body instanceof FormData) {
      body = options.body;
    } else if (options?.body) {
      body = JSON.stringify(options.body);
    }

    const baseHeaders: Record<string, string> = {
      "Content-Type": isFormData(body)
        ? "multipart/form-data"
        : "application/json",
    };

    const baseUrl =
      options?.baseUrl === undefined
        ? process.env.NEXT_PUBLIC_API_ENDPOINT
        : options.baseUrl;

    const fullUrl = `${baseUrl}${url}`;

    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers,
      },
      body,
      method,
    });
    const payload: Response = await res.json();

    const data = {
      status: res.status,
      payload,
    };

    return data;
  } catch (error) {
    return {
      status: HTTP_STATUS.SERVER_ERROR,
      payload: undefined,
    };
  }
};

export const http = {
  get<Response>(url: string, options?: Omit<CustomOptionsType, "body">) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptionsType, "body">
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptionsType, "body">
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(url: string, options?: Omit<CustomOptionsType, "body">) {
    return request<Response>("DELETE", url, { ...options });
  },
};
