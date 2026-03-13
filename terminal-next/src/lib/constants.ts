import { BlogPost, Category, CategoryInfo } from '@/types';

/**
 * Blog post data with relatedPosts for Obsidian-style graph.
 * In production, this would come from MDX frontmatter.
 */
export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'spring-security-jwt',
        title: 'Spring Security + JWT 인증 구현하기',
        date: '2025-03-10',
        category: 'Spring',
        excerpt: 'Spring Security 6에서 JWT 기반 인증/인가를 구현하는 방법을 정리합니다.',
        readingTime: 8,
        relatedPosts: ['msa-event-driven', 'til-jpa-n-plus-one'],
        content: `# Spring Security + JWT 인증 구현하기

Spring Security 6에서 JWT 기반 인증을 구현하는 방법을 정리합니다.

## SecurityFilterChain 설정
\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}
\`\`\`

## Key Takeaways
1. SecurityFilterChain으로 필터 체인 구성
2. JWT 토큰 생성 및 검증 로직 분리
3. RefreshToken은 Redis에 저장하는 것을 권장`,
    },
    {
        id: 'msa-event-driven',
        title: 'MSA에서 이벤트 기반 아키텍처 설계',
        date: '2025-02-20',
        category: 'Architecture',
        excerpt: 'Kafka를 활용한 이벤트 기반 마이크로서비스 아키텍처 설계 경험을 공유합니다.',
        readingTime: 12,
        relatedPosts: ['spring-security-jwt', 'docker-compose-dev'],
        content: `# MSA에서 이벤트 기반 아키텍처 설계

Kafka를 활용한 이벤트 드리븐 아키텍처 설계 경험을 공유합니다.`,
    },
    {
        id: 'nextjs-blog-rebuild',
        title: 'Next.js로 개인 블로그 다시 만들기',
        date: '2025-03-12',
        category: 'Frontend',
        excerpt: '터미널 테마에서 미니멀 화이트 블로그로 리디자인한 과정을 기록합니다.',
        readingTime: 6,
        relatedPosts: [],
        content: `# Next.js로 개인 블로그 다시 만들기

기존 터미널 테마를 벗어나 깔끔한 미니멀 화이트 디자인으로 리빌딩했습니다.`,
    },
    {
        id: 'docker-compose-dev',
        title: 'Docker Compose로 개발 환경 구축하기',
        date: '2025-01-15',
        category: 'DevOps',
        excerpt: 'Spring Boot + MySQL + Redis를 Docker Compose로 한 번에 띄우는 방법.',
        readingTime: 5,
        relatedPosts: ['msa-event-driven'],
        content: `# Docker Compose로 개발 환경 구축하기

로컬에서 Spring Boot + MySQL + Redis를 Docker Compose로 관리하는 방법을 정리합니다.`,
    },
    {
        id: 'network-tcp-handshake',
        title: 'TCP 3-way Handshake 쉽게 이해하기',
        date: '2025-01-08',
        category: 'CS',
        excerpt: 'TCP 연결 수립 과정인 3-way handshake를 그림과 함께 설명합니다.',
        readingTime: 4,
        relatedPosts: [],
        content: `# TCP 3-way Handshake 쉽게 이해하기

TCP 연결이 어떻게 수립되는지 단계별로 정리합니다.`,
    },
    {
        id: '2025-q1-retrospective',
        title: '2025년 1분기 회고',
        date: '2025-03-01',
        category: 'Retrospective',
        excerpt: '1분기 동안 배운 것, 아쉬운 것, 다음 분기 목표를 정리합니다.',
        readingTime: 7,
        relatedPosts: [],
        content: `# 2025년 1분기 회고

1분기를 돌아보며 배운 것과 아쉬운 점을 정리합니다.`,
    },
    {
        id: 'cafe-coding',
        title: '요즘 자주 가는 코딩 카페 추천',
        date: '2025-02-10',
        category: 'Daily',
        excerpt: '서울에서 코딩하기 좋은 카페 몇 곳을 소개합니다.',
        readingTime: 3,
        relatedPosts: [],
        content: `# 요즘 자주 가는 코딩 카페 추천

코딩하기 좋은 카페를 소개합니다.`,
    },
    {
        id: 'til-jpa-n-plus-one',
        title: 'TIL: JPA N+1 문제 해결법',
        date: '2025-03-05',
        category: 'TIL',
        excerpt: 'fetch join과 @EntityGraph로 N+1 문제를 해결하는 방법을 빠르게 정리.',
        readingTime: 2,
        relatedPosts: ['spring-security-jwt'],
        content: `# TIL: JPA N+1 문제 해결법

N+1 문제를 해결하는 두 가지 방법을 정리합니다.`,
    },
];

/**
 * Extract unique categories with post counts.
 */
export function getCategoryInfo(posts: BlogPost[]): CategoryInfo[] {
    const countMap = new Map<Category, number>();

    posts.forEach((post) => {
        const count = countMap.get(post.category) || 0;
        countMap.set(post.category, count + 1);
    });

    return Array.from(countMap.entries()).map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase(),
    }));
}

/**
 * Filter posts by category.
 */
export function filterPostsByCategory(
    posts: BlogPost[],
    category: Category | 'All',
): BlogPost[] {
    if (category === 'All') return posts;
    return posts.filter((post) => post.category === category);
}

/**
 * Find a post by ID.
 */
export function getPostById(id: string): BlogPost | undefined {
    return BLOG_POSTS.find((post) => post.id === id);
}

/**
 * Get related posts for a given post.
 */
export function getRelatedPosts(post: BlogPost): BlogPost[] {
    if (!post.relatedPosts) return [];
    return post.relatedPosts
        .map((id) => BLOG_POSTS.find((p) => p.id === id))
        .filter(Boolean) as BlogPost[];
}
