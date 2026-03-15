/* ===== Blog Types ===== */

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    category: Category;
    excerpt: string;
    content: string;
    readingTime?: number;
    tags?: string[];
    related?: string[];        // MDX frontmatter에서 명시하는 연결 포스트 슬러그
    relatedPosts?: string[];   // IDs of connected posts (legacy — for graph)
    thumbnail?: string;
}

export type Category =
    | 'CS'
    | 'Architecture'
    | 'Spring'
    | 'TIL';

export interface CategoryInfo {
    name: Category;
    count: number;
    slug: string;
}

/* ===== Graph Types (Obsidian-style connections) ===== */

export interface GraphNode {
    id: string;
    title: string;
    category: Category;
    x?: number;
    y?: number;
}

export interface GraphEdge {
    source: string;
    target: string;
}

export interface NoteGraph {
    nodes: GraphNode[];
    edges: GraphEdge[];
}
