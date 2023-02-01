/**
 * Represents a single game in a player's library steam.
 */
interface ISteamPlayerGame {
    appid: number;
    name: string;
    playtime_2weeks: number;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
}

export type { ISteamPlayerGame };
