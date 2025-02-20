export function formatToBrl(num: number) {
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}