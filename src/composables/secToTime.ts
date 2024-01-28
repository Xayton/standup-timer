function padDigit(n: number): string {
    return n > 9 ? n.toString() : "0" + n;
}

export function secToTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    return `${padDigit(minutes)}:${padDigit(seconds - minutes * 60)}`;
}