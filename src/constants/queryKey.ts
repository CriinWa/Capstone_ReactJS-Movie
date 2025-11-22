type QueryKeyFactory<T extends readonly unknown[]> = {
    all: T
    lists: () => readonly [...T, 'list']
    list: (filters?: string) => readonly [...T, 'list', { filters?: string }]
    details: () => readonly [...T, 'detail']
    detail: (
        id: string,
        params?: Record<string, unknown>
    ) => readonly [...T, 'detail', string, ...Record<string, unknown>[]]
}

// ============================================Create Query Key Factory==============================================================

function createQueryKeyFactory<T extends string>(baseKey: T): QueryKeyFactory<[T]> {
    return {
        all: [baseKey] as const,
        lists: () => [baseKey, 'list'] as const,
        list: (filters?: string) => [baseKey, 'list', { filters }] as const,
        details: () => [baseKey, 'detail'] as const,
        detail: (id: string, params?: Record<string, unknown>) =>
            [baseKey, 'detail', id, ...(params ? [params] : [])] as const,
    }
}

// ============================================Export==============================================================
export const queryKeys = {
    banner: createQueryKeyFactory('banner'),
    movieSchedule: createQueryKeyFactory('movieSchedule'),
    booking: createQueryKeyFactory('booking'),
    user: {
        all: ['user'] as const,
        profile: ['user', 'profile'] as const,
    }
}
