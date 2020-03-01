import React from 'react';
import { Picker as RNPicker, PickerProps as RNPickerProps, StyleSheet } from 'react-native';

import { getBaseFontSize } from '../helper';

// -----------------------------------------------------------------------------

interface PickerProps extends RNPickerProps {
    children?: any;
}

const Picker = (props: PickerProps) => {
    const { children, style, ...restProps } = props;
    return <RNPicker style={[STYLES.base, style]} {...restProps}>
        {children}
    </RNPicker>;
}

export default Picker;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    base: {

    },
});