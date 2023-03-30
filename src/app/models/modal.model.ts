export default interface Modal{
    hasHeader?: boolean;
    headerTitle?: string;
    text: string;
    opened: boolean;
    buttons?: Button[];
}

interface Button {
    text: string;
    action: () => void
}