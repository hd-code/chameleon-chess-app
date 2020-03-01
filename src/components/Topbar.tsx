import React from 'react';
import { StyleSheet, View } from 'react-native';

import { getImages } from '../assets';
import { getBaseFontSize } from '../helper';

import Image from './Image';
import Logo from './Logo';

import { goto } from '../controller/app';

// -----------------------------------------------------------------------------

/** A topbar that gets displayed on almost all views right at the top. It
 * contains a home and a settings button.
 */
const Topbar = () =>
    <View style={STYLES.wrapper}>
        <View style={STYLES.square}>
            <Image source={getImages().home} onPress={goto.home} />
        </View>

        <Logo />

        <View style={STYLES.square}>
            <Image source={getImages().settings} onPress={goto.settings} />
        </View>
    </View>
;

export default Topbar;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: getBaseFontSize() * 4.3,
        width: '100%',
    },
    square: {
        aspectRatio: 1,
        height: '85%',
    },
});