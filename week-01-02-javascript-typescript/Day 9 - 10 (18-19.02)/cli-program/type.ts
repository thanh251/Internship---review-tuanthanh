export type Priority = 'low' | 'medium' | 'high';
export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: Priority;
}