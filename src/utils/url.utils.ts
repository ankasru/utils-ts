export function isLocal (): boolean {
    const { host } = window.location;

    return host.includes('.local') || host.includes('test');
}

export function open (source: string, target: string = '_blank'): void {
    window.open(source, target);
}
