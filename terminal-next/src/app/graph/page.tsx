'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BLOG_POSTS } from '@/lib/constants';
import { GraphNode, GraphEdge } from '@/types';
import { useRouter } from 'next/navigation';

/**
 * Obsidian-style interactive note connection graph.
 * Uses canvas for rendering with force-directed layout.
 */
export default function GraphPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const nodesRef = useRef<(GraphNode & { x: number; y: number; vx: number; vy: number })[]>([]);
    const edgesRef = useRef<GraphEdge[]>([]);
    const animRef = useRef<number>(0);

    // Build graph data
    useEffect(() => {
        const nodes = BLOG_POSTS.map((post, i) => ({
            id: post.id,
            title: post.title,
            category: post.category,
            x: 300 + Math.cos((i / BLOG_POSTS.length) * Math.PI * 2) * 120,
            y: 200 + Math.sin((i / BLOG_POSTS.length) * Math.PI * 2) * 120,
            vx: 0,
            vy: 0,
        }));

        const edges: GraphEdge[] = [];
        BLOG_POSTS.forEach((post) => {
            post.relatedPosts?.forEach((targetId) => {
                if (BLOG_POSTS.find((p) => p.id === targetId)) {
                    edges.push({ source: post.id, target: targetId });
                }
            });
        });

        nodesRef.current = nodes;
        edgesRef.current = edges;
    }, []);

    // Category colors
    const getCategoryColor = useCallback((category: string, alpha: number = 1): string => {
        const colors: Record<string, string> = {
            Development: `rgba(37, 99, 235, ${alpha})`,
            Linux: `rgba(234, 88, 12, ${alpha})`,
            AI: `rgba(139, 92, 246, ${alpha})`,
            Design: `rgba(236, 72, 153, ${alpha})`,
            DevOps: `rgba(20, 184, 166, ${alpha})`,
            Retrospective: `rgba(107, 114, 128, ${alpha})`,
        };
        return colors[category] || `rgba(107, 114, 128, ${alpha})`;
    }, []);

    // Force simulation & render
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const tick = () => {
            const nodes = nodesRef.current;
            const edges = edgesRef.current;
            const w = canvas.width / window.devicePixelRatio;
            const h = canvas.height / window.devicePixelRatio;

            // Simple force simulation
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[j].x - nodes[i].x;
                    const dy = nodes[j].y - nodes[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = 800 / (dist * dist);
                    nodes[i].vx -= (dx / dist) * force;
                    nodes[i].vy -= (dy / dist) * force;
                    nodes[j].vx += (dx / dist) * force;
                    nodes[j].vy += (dy / dist) * force;
                }
            }

            // Edge attraction
            edges.forEach(({ source, target }) => {
                const s = nodes.find((n) => n.id === source);
                const t = nodes.find((n) => n.id === target);
                if (!s || !t) return;
                const dx = t.x - s.x;
                const dy = t.y - s.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = (dist - 150) * 0.01;
                s.vx += (dx / dist) * force;
                s.vy += (dy / dist) * force;
                t.vx -= (dx / dist) * force;
                t.vy -= (dy / dist) * force;
            });

            // Center gravity
            nodes.forEach((n) => {
                n.vx += (w / 2 - n.x) * 0.002;
                n.vy += (h / 2 - n.y) * 0.002;
                n.vx *= 0.92;
                n.vy *= 0.92;
                n.x += n.vx;
                n.y += n.vy;
                n.x = Math.max(60, Math.min(w - 60, n.x));
                n.y = Math.max(60, Math.min(h - 60, n.y));
            });

            // Clear
            ctx.clearRect(0, 0, w, h);

            // Draw edges
            edges.forEach(({ source, target }) => {
                const s = nodes.find((n) => n.id === source);
                const t = nodes.find((n) => n.id === target);
                if (!s || !t) return;

                const isHighlighted = hoveredNode === source || hoveredNode === target;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(t.x, t.y);
                ctx.strokeStyle = isHighlighted
                    ? 'rgba(37, 99, 235, 0.5)'
                    : 'var(--border-subtle)';
                ctx.lineWidth = isHighlighted ? 2 : 1;
                ctx.stroke();
            });

            // Draw nodes
            nodes.forEach((node) => {
                const isHovered = hoveredNode === node.id;
                const radius = isHovered ? 8 : 6;

                // Glow
                if (isHovered) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
                    ctx.fillStyle = getCategoryColor(node.category, 0.1);
                    ctx.fill();
                }

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = getCategoryColor(node.category);
                ctx.fill();

                // Label
                ctx.font = `${isHovered ? '600' : '400'} 12px var(--font-inter), system-ui, sans-serif`;
                ctx.fillStyle = isHovered ? getCategoryColor(node.category) : '#737373';
                ctx.textAlign = 'center';
                ctx.fillText(node.title, node.x, node.y + 22);
            });

            animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [hoveredNode, getCategoryColor]);

    // Mouse interaction
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const found = nodesRef.current.find((n) => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < 20;
        });

        setHoveredNode(found?.id || null);
        canvas.style.cursor = found ? 'pointer' : 'default';
    }, []);

    const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const found = nodesRef.current.find((n) => {
            const dx = n.x - x;
            const dy = n.y - y;
            return Math.sqrt(dx * dx + dy * dy) < 20;
        });

        if (found) {
            router.push(`/blog/${found.id}`);
        }
    }, [router]);

    return (
        <div className="space-y-8">
            <div>
                <h1
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Note Graph
                </h1>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    옵시디언처럼 글들의 연결 관계를 시각화합니다. 노드를 클릭하면 해당 글로 이동합니다.
                </p>
            </div>

            <div
                ref={containerRef}
                className="w-full rounded-xl overflow-hidden"
                style={{
                    height: '500px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                }}
            >
                <canvas
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                    className="w-full h-full"
                />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                {['Development', 'Linux', 'AI', 'Design', 'DevOps'].map((cat) => (
                    <div key={cat} className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getCategoryColor(cat) }}
                        />
                        <span>{cat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
