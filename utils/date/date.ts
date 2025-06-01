export function formatDate(dateText: string): string {
    const date = new Date(dateText)
    return date.getDay() + "-" + date.getMonth() + "-" +  date.getFullYear()
}
