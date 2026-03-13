'use client';

import React from 'react';
import { Category } from '@/types';

interface CategoryFilterProps {
    categories: { name: Category; count: number }[];
    activeCategory: Category | 'All';
    onSelect: (category: Category | 'All') => void;
}

/**
 * Horizontal category filter pills.
 * Minimal style — just text weight changes, subtle background on active.
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onSelect,
}) => {
    const allCount = categories.reduce((sum, c) => sum + c.count, 0);

    return (
        <div className="flex flex-wrap gap-2">
            <FilterPill
                label="All"
                count={allCount}
                isActive={activeCategory === 'All'}
                onClick={() => onSelect('All')}
            />
            {categories.map(({ name, count }) => (
                <FilterPill
                    key={name}
                    label={name}
                    count={count}
                    isActive={activeCategory === name}
                    onClick={() => onSelect(name)}
                />
            ))}
        </div>
    );
};

interface FilterPillProps {
    label: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({ label, count, isActive, onClick }) => (
    <button
        onClick={onClick}
        className="px-3 py-1.5 text-sm rounded-lg transition-all duration-150 cursor-pointer border-none"
        style={{
            color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
            backgroundColor: isActive
                ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                : 'transparent',
            fontWeight: isActive ? 600 : 400,
        }}
    >
        {label}
        <sup
            className="ml-0.5 text-[10px]"
            style={{ color: 'var(--text-muted)' }}
        >
            {count}
        </sup>
    </button>
);
