import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';

import { getColors } from '../../assets';

// -----------------------------------------------------------------------------

interface SwitchProps extends RNSwitchProps {}

/** The react-native switch component with some custom styling. Use this
 * component instead of the original react-native component to keep the styling
 * consistent. */
const Switch = (props: SwitchProps) => 
    <RNSwitch
        trackColor={{false: getColors().shader.darken, true: getColors().main[1]}}
        thumbColor={getColors().basic.white}
        {...props}
    />
;

export default Switch;