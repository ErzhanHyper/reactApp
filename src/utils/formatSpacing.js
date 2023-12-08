export function formatSpacing(value) {
    const [ price ] = value.toString().split(' ');
    return `${(+price).toLocaleString()}`;
}