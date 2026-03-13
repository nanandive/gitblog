import { z } from 'zod';

/**
 * Schema for AI ask endpoint
 */
export const askRequestSchema = z.object({
    prompt: z
        .string()
        .min(1, 'Prompt cannot be empty')
        .max(1000, 'Prompt must be 1000 characters or less')
        .trim(),
});

export type AskRequest = z.infer<typeof askRequestSchema>;

/**
 * Generic validation result type
 */
export interface ValidationResult<T> {
    success: boolean;
    data?: T;
    errors?: string[];
}

/**
 * Validate request body against a schema
 */
export function validateRequest<T>(
    data: unknown,
    schema: z.ZodSchema<T>
): ValidationResult<T> {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const errors = result.error.issues.map(err => {
        const path = err.path.join('.');
        return path ? `${path}: ${err.message}` : err.message;
    });

    return { success: false, errors };
}

/**
 * Common error response format
 */
export interface ApiErrorResponse {
    error: string;
    details?: string[];
    code: string;
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
    message: string,
    code: string,
    details?: string[]
): ApiErrorResponse {
    return {
        error: message,
        code,
        ...(details && { details }),
    };
}

/**
 * Error codes for API responses
 */
export const ErrorCodes = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    NOT_CONFIGURED: 'NOT_CONFIGURED',
} as const;
