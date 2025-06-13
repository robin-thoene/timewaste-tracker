import React from 'react';
import NavigationTop from '../../navigation/navigationTop';
import { IBasicLayoutProps } from './properties';

const BasicLayout = (props: IBasicLayoutProps) => {
    return (
        <div className="dark:bg-black dark:text-white overflow-hidden h-screen flex max-h-screen flex-1 flex-col">
            <NavigationTop />
            <div className="flex flex-1 overflow-hidden">{props.children}</div>
        </div>
    );
};

export default BasicLayout;
