/* ===== Blog Types ===== */

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    category: Category;
    excerpt: string;
    content: string;
    readingTime?: number;
    relatedPosts?: string[];   // IDs of connected posts (for Obsidian graph)
    thumbnail?: string;
}

export type Category =
    | 'Development'
    | 'Linux'
    | 'AI'
    | 'Design'
    | 'DevOps'
    | 'Retrospective';

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
