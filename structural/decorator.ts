interface HttpClient {
    get(url: string): Promise<string>;
}

class HttpClientImpl implements HttpClient {
    async get(url: string): Promise<string> {
        // Simulate an HTTP GET request
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}

class RetryDecorator implements HttpClient {
    private client: HttpClient;
    private retries: number;
    private delayMs: number;

    constructor(client: HttpClient, retries: number, delayMs: number) {
        this.client = client;
        this.retries = retries;
        this.delayMs = delayMs || 300;
    }

    async get(url: string): Promise<string> {
        let attempt = 0;
        while (true) {
            try {
                return await this.client.get(url);
            } catch (err) {
                console.error(`Attempt ${attempt + 1} failed:`, err);
                if (++attempt > this.retries) throw err;
                await new Promise(r => setTimeout(r, this.delayMs * 2 ** (attempt - 1)));
            }
        }
    }
}

type CacheEntry = { exp: number; data: unknown };

export class CacheDecorator implements HttpClient {
  private cache = new Map<string, CacheEntry>();

  constructor(private wrapped: HttpClient, private ttlSec = 30) {}

  async get(url: string): Promise<string> {
    const now = Date.now();
    const hit = this.cache.get(url);
    if (hit && hit.exp > now) return hit.data as string;

    const data = await this.wrapped.get(url);
    this.cache.set(url, { exp: now + this.ttlSec * 1_000, data });
    return data;
  }
}


const basic = new HttpClientImpl();

const withRetry = new RetryDecorator(basic, 5, 500);
const cachedAndRetried = new CacheDecorator(withRetry, 60);

const httpClient = cachedAndRetried;

httpClient.get("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => console.log(response))
    .catch(error => console.error(error));
