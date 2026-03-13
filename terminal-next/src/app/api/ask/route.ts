import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { BLOG_POSTS } from '@/lib/constants';
import { checkRateLimit, getClientIP, createRateLimitHeaders, cleanupRateLimitStore } from '@/lib/rate-limit';
import { askRequestSchema, validateRequest, createErrorResponse, ErrorCodes } from '@/lib/validation';

export async function POST(request: NextRequest) {
    try {
        // Periodic cleanup of rate limit store (10% probability)
        if (Math.random() < 0.1) {
            cleanupRateLimitStore();
        }

        // 1. Rate Limiting
        const clientIP = getClientIP(request);
        const rateLimitResult = checkRateLimit(clientIP);

        if (!rateLimitResult.allowed) {
            const headers = createRateLimitHeaders(rateLimitResult.remaining, rateLimitResult.resetIn);
            return NextResponse.json(
                createErrorResponse(
                    'Rate limit exceeded. Please wait before making more requests.',
                    ErrorCodes.RATE_LIMIT_EXCEEDED
                ),
                { status: 429, headers }
            );
        }

        // 2. Parse and Validate Input
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                createErrorResponse('Invalid JSON body', ErrorCodes.VALIDATION_ERROR),
                { status: 400 }
            );
        }

        const validation = validateRequest(body, askRequestSchema);
        if (!validation.success) {
            return NextResponse.json(
                createErrorResponse(
                    'Validation failed',
                    ErrorCodes.VALIDATION_ERROR,
                    validation.errors
                ),
                { status: 400 }
            );
        }

        const { prompt } = validation.data!;

        // 3. Check API Key Configuration
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                createErrorResponse(
                    'Service temporarily unavailable.',
                    ErrorCodes.NOT_CONFIGURED
                ),
                { status: 503 }
            );
        }

        // 4. Call Gemini API
        const ai = new GoogleGenAI({ apiKey });

        const blogContext = BLOG_POSTS
            .map(p => `Post: ${p.title}\nExcerpt: ${p.excerpt}`)
            .join('\n\n');

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `You are the AI assistant for a developer's Ubuntu-themed terminal blog. 
The following is the content available on this blog:
${blogContext}

The user is asking: "${prompt}"

Respond in a helpful, concise manner, ideally fitting into a terminal output window. Keep it "techy".`,
            config: {
                temperature: 0.7,
                topP: 0.9,
            }
        });

        // 5. Return Success Response
        const headers = createRateLimitHeaders(rateLimitResult.remaining, rateLimitResult.resetIn);
        return NextResponse.json(
            { response: response.text ?? "I couldn't generate a response. Please try again." },
            { headers }
        );

    } catch (error) {
        console.error('Gemini API Error:', error);

        // Don't expose internal error details
        return NextResponse.json(
            createErrorResponse(
                'An error occurred while processing your request.',
                ErrorCodes.INTERNAL_ERROR
            ),
            { status: 500 }
        );
    }
}
