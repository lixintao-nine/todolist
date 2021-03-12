interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
}
// 定义一个保存数据（保存至浏览器缓存）
export function saveTodos(todos: Todo[]) {
    localStorage.setItem('today_key', JSON.stringify(todos))
}
// 定义一个读取数据（读取浏览器缓存,返回一个Todo类型）
export function readTodos(): Todo[] {
    return JSON.parse(localStorage.getItem('today_key') || '[]')
}