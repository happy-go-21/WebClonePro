import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Cache for CSRF token to avoid multiple requests
let csrfTokenCache: string | null = null;
let csrfTokenPromise: Promise<string> | null = null;

async function getCSRFToken(): Promise<string> {
  // If we already have a token, return it
  if (csrfTokenCache) {
    return csrfTokenCache;
  }
  
  // If there's already a request in flight, wait for it
  if (csrfTokenPromise) {
    return csrfTokenPromise;
  }
  
  // Fetch CSRF token
  csrfTokenPromise = fetch('/api/csrf-token', {
    credentials: 'include',
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to get CSRF token');
    }
    return res.json();
  })
  .then(data => {
    csrfTokenCache = data.csrfToken;
    csrfTokenPromise = null;
    return data.csrfToken;
  })
  .catch(error => {
    csrfTokenPromise = null;
    throw error;
  });
  
  return csrfTokenPromise;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const headers: HeadersInit = {
    ...(data ? { "Content-Type": "application/json" } : {})
  };

  // Add CSRF token for non-GET requests
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    try {
      const csrfToken = await getCSRFToken();
      headers['X-CSRF-Token'] = csrfToken;
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
      throw new Error('Failed to get CSRF token');
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  // If we get a 403, clear the CSRF token cache and retry once
  if (res.status === 403 && method !== 'GET') {
    csrfTokenCache = null;
    try {
      const csrfToken = await getCSRFToken();
      const retryRes = await fetch(url, {
        method,
        headers: {
          ...headers,
          'X-CSRF-Token': csrfToken,
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include",
      });
      
      await throwIfResNotOk(retryRes);
      return retryRes;
    } catch (retryError) {
      console.error('Retry with fresh CSRF token failed:', retryError);
    }
  }

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
