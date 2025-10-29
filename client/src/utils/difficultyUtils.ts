import type { Voyage } from '../types/Voyage'

export const getDifficultyClass = (difficulty: Voyage['difficulty']): string => {
    const difficultyClass: Record<Voyage['difficulty'], string> = {
        Easy: 'badge-success',
        Moderate: 'badge-warning',
        Hard: 'badge-error',
    }
    return difficultyClass[difficulty]
}

// You can also export the mapping if needed elsewhere
export const difficultyClassMap: Record<Voyage['difficulty'], string> = {
    Easy: 'badge-success',
    Moderate: 'badge-warning',
    Hard: 'badge-error',
}