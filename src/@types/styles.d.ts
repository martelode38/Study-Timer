import { defaultTheme } from './../styles/themes/default';
//arquivo de difinição de tipos

import 'styled-components';
import { defaultTheme } from '../styles/themes/default';


type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
    export interface defaultTheme extends ThemeType{}
}