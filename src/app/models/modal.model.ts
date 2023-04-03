export default interface Modal{
    hasHeader?: boolean;
    headerTitle?: string;
    text: string;
    opened: boolean;
    buttons?: Button[];
    actionAfterModalClose?: () => void
}

interface Button {
    text: string;
    action: () => void
}