/**
 * Properties that are shared across all button components.
 */
interface IButtonProps {
    /** The action to execute on click. */
    onClick?: () => void;
    /** Whether the button is disabled or not. */
    disabled?: boolean;
    /** The aria label text. */
    ariaLabel?: string;
}

export type { IButtonProps };
