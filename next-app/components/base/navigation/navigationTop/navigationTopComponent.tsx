import React from 'react';
import LanguageSelector from '../../languageSelector';

const NavigationTop = () => {
    return (
        <div className="fixed left-0 top-0 z-50 min-h-max p-1 sm:p-3 lg:bg-transparent flex justify-end w-full">
            <LanguageSelector />
        </div>
    );
};

export default NavigationTop;
