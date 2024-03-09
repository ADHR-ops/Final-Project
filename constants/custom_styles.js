import {Sizes} from "./sizes";
import {Colors} from "./colors";
import {TypeScale} from "./type_scale";

const CustomStyles = {

    //global style for screen container
    screenContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Sizes.screenPadding,
        backgroundColor: Colors.backgroundColor,
    },
    screenScrollContainerStyle: {
        flexGrow: 1,
    },

    //for screen texts
    title: {
        ...TypeScale.h1Headline,
        marginBottom: Sizes.formHeight * 0.5,
        textAlign: 'center',
    },
    subtitle: {
        ...TypeScale.h5Headline,
        marginBottom: Sizes.formHeight * 2,
        textAlign: 'center',
    },

    //for function buttons
    button: {
        backgroundColor: Colors.buttonBackgroundColor,
        height: Sizes.buttonHeight,
        borderRadius: Sizes.buttonRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonTextColor: {
        color: Colors.buttonTextColor,
    },

    //for social media button
    socialMediaButton: {
        backgroundColor: 'transparent',
        height: Sizes.buttonHeight,
        borderWidth: 1.0,
        borderColor: Colors.lightColor,
        borderRadius: Sizes.buttonRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },

    socialMediaButtonImage: {
        height: Sizes.buttonHeight * 0.5,
        width: Sizes.buttonHeight * 0.5,
    },

    socialMediaButtonText: {
        ...TypeScale.button,
        color: Colors.lightColor,
    },


    //for input styles
    input: {
        ...TypeScale.subtitle1,
        height: Sizes.buttonHeight,
        borderWidth: 1,
        borderRadius: Sizes.textFormFieldRadius,
        borderColor: Colors.lightColor,
        marginBottom: Sizes.formHeight,
        padding: Sizes.textFormFieldPadding,
    },
};

export {CustomStyles};