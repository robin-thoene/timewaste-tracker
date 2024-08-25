import tailwindConfig from '../../tailwind.config.js';
import useIsDarkModeEnabled from '../useIsDarkModeEnabled';

/**
 * Retrieve the color palette of the currently applied theme.
 * @returns {object} The color theme.
 */
const useColorTheme = (): { [key: string]: string } => {
    /** Whether the dark mode is enabled or not. */
    const isDarkModeEnabled = useIsDarkModeEnabled();

    // Build the colors object based on the daisy ui colors.
    let colors: { [key: string]: string } = {};
    if (isDarkModeEnabled) {
        colors = tailwindConfig.daisyui.themes[0].dark;
    } else {
        colors = tailwindConfig.daisyui.themes[0].light;
    }
    // Push all custom tailwind colors as well to the colors object.
    const tailwindThemeColors = tailwindConfig.theme.extend.colors as { [key: string]: string };
    Object.keys(tailwindThemeColors).forEach((key) => {
        const tailwindColor = tailwindThemeColors[key];
        if (tailwindColor) {
            colors[key] = tailwindColor;
        }
    });
    // Return the color theme.
    return colors;
};

export default useColorTheme;
