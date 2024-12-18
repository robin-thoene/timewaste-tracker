import React, { FunctionComponent, ReactElement } from 'react';

import { IIconTextButtonProps } from './properties';

/**
 * The icon plus text button.
 * @param {IIconTextButtonProps} props The component properties.
 * @returns {ReactElement} The icon and text button component.
 */
const IconTextButton: FunctionComponent<IIconTextButtonProps> = (props: IIconTextButtonProps): ReactElement => {
    return (
        <button
            aria-label={props.ariaLabel}
            className={`btn ${props.useSecondaryColor ? 'text-secondary' : ''} btn-ghost ${props.fullWidth ? 'w-full' : 'w-max'}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <div className="flex items-center justify-center gap-2">{props.text}</div>
        </button>
    );
};

export default IconTextButton;
