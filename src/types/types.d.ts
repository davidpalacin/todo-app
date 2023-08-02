export interface Task {
    id: number
    title: string
    content: string
    state: 'pending' | 'in progress' | 'completed'
}

export type Tasks = {
    id: number
    title: string
    content: string
    state: 'pending' | 'in progress' | 'completed'
}[]