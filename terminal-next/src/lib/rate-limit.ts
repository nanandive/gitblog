/**
 * In-memory rate limiter using token bucket algorithm
 * For production, use Redis or a distributed rate limiter
 */

interface RateLimitEntry {
    tokens: number;
    lastRefill: number;
}

// In-memory store (per-instance, not distributed)
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
    maxTokens: number;       // Maximum requests allowed
    refillRate: number;      // Tokens added per interval
    refillInterval: number;  // Interval in milliseconds
}

const DEFAULT_CONFIG: RateLimitConfig = {
    maxTokens: 10,           // 10 requests max
    refillRate: 1,           // 1 token per interval
    refillInterval: 6000,    // Every 6 seconds (10 per minute)
};

/**
 * Check if a request is allowed based on rate limiting
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    let entry = rateLimitStore.get(identifier);

    // Initialize new entry
    if (!entry) {
        entry = {
            tokens: config.maxTokens - 1, // Consume one token
            lastRefill: now,
        };
        rateLimitStore.set(identifier, entry);
        return { allowed: true, remaining: entry.tokens, resetIn: config.refillInterval };
    }

    // Calculate tokens to refill
    const timePassed = now - entry.lastRefill;
    const tokensToAdd = Math.floor(timePassed / config.refillInterval) * config.refillRate;

    if (tokensToAdd > 0) {
        entry.tokens = Math.min(config.maxTokens, entry.tokens + tokensToAdd);
        entry.lastRefill = now;
    }

    // Check if request is allowed
    if (entry.tokens > 0) {
        entry.tokens--;
        rateLimitStore.set(identifier, entry);
        return {
            allowed: true,
            remaining: entry.tokens,
            resetIn: config.refillInterval - (now - entry.lastRefill)
        };
    }

    // Rate limited
    const resetIn = config.refillInterval - (now - entry.lastRefill);
    return { allowed: false, remaining: 0, resetIn };
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
    // Check common headers used by proxies/load balancers
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Fallback - in dev environment, use a default
    return 'anonymous';
}

/**
 * Create rate limit response headers
 */
export function createRateLimitHeaders(remaining: number, resetIn: number): Headers {
    const headers = new Headers();
    headers.set('X-RateLimit-Remaining', remaining.toString());
    headers.set('X-RateLimit-Reset', Math.ceil(resetIn / 1000).toString());
    return headers;
}

/**
 * Cleanup old entries (run periodically)
 */
export function cleanupRateLimitStore(maxAge: number = 3600000): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now - entry.lastRefill > maxAge) {
            rateLimitStore.delete(key);
        }
    }
}
