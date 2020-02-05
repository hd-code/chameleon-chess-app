import React, { useState } from "react";
import { View, ViewStyle, TextStyle, Modal, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";

import { getScreenDim, getBaseFontSize } from '../../helper';

import { getColors } from '../../models/Colors';

// -----------------------------------------------------------------------------

interface PopupProps {
    children: JSX.Element|JSX.Element[];
    style?: ViewStyle;
    visible?: boolean;
    onPressClose?: () => void;
}

const Popup = (props: PopupProps) => {
    return (
        <Modal transparent={true} animationType={'fade'} visible={props.visible}>
            <View style={OVERLAY_STYLE}>
                <View>
                    {props.onPressClose && (
                    <TouchableWithoutFeedback onPress={props.onPressClose}>
                        <Text style={X_STYLE}>&times;</Text>
                    </TouchableWithoutFeedback>)}
                    <View style={[CONTENT_BOX_STYLE, props.style]}>
                        {props.children}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default Popup;

// -----------------------------------------------------------------------------

const OVERLAY_STYLE: ViewStyle = {
    backgroundColor: getColors().shader.darker,
    alignItems: 'center',
    justifyContent: 'center',
    height: getScreenDim().height,
    width:  getScreenDim().width,
    zIndex: 9,
}

const CONTENT_BOX_STYLE: ViewStyle = {
    backgroundColor: getColors().basic.background,
    maxHeight: getScreenDim().height,
    maxWidth:  getScreenDim().width,
    padding:   getBaseFontSize(),
}

const X_STYLE: TextStyle = {
    color: getColors().shader.lighter,
    fontSize: getBaseFontSize() * 2.5,
    fontWeight: 'bold',
    textAlign: 'right',
}