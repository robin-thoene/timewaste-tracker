import React, { FunctionComponent, ReactElement } from 'react';

import DarkModeToggle from '../../darkModeToggle';
import LanguageSelector from '../../languageSelector';

/**
 * Basic top navigation to display the logo.
 * @returns {ReactElement} The top navigation component.
 */
const NavigationTop: FunctionComponent = (): ReactElement => {
    return (
        <div className="navbar fixed left-0 top-0 z-50 min-h-max bg-base-100 p-1 sm:p-3 lg:bg-transparent">
            <div className="grid w-full grid-cols-2">
                <div className="flex items-center justify-end">
                    <DarkModeToggle />
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
};

export default NavigationTop;
