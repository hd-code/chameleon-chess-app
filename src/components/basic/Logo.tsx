import React from 'react';
import { } from 'react-native';

import Text, { ETextType } from './Text';

import { ELanguage } from '../../models/Language';

// -----------------------------------------------------------------------------

interface LogoProps {
    language: ELanguage;
}

const Logo = (props: LogoProps) =>
    <Text type={ETextType.LOGO}>{TEXT[props.language]}</Text>
;

export default Logo;

// -----------------------------------------------------------------------------

const TEXT = {
    [ELanguage.ENGLISH]: 'Chameleon\nChess',
    [ELanguage.GERMAN]:  'Chamäleon\nSchach',
}