import { Component } from 'react';
import { TextInput, ViewStyle, KeyboardType, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
interface IState {
    focusedInput: number;
    otpText: string[];
}
interface IProps {
    defaultValue: string;
    inputCount: number;
    containerStyle: ViewStyle;
    textInputStyle: ViewStyle;
    inputCellLength: number;
    tintColor: string | string[];
    offTintColor: string | string[];
    handleTextChange(text: string): void;
    keyboardType: KeyboardType;
    testIDPrefix: string;
    autoFocus: boolean;
}
declare class OTPTextView extends Component<IProps, IState> {
    static defaultProps: Partial<IProps>;
    inputs: TextInput[];
    constructor(props: IProps);
    getOTPTextChucks: (inputCount: number, inputCellLength: number, text: string) => string[];
    checkTintColorCount: () => void;
    basicValidation: (text: string) => RegExpMatchArray | null;
    onTextChange: (text: string, i: number) => void;
    onInputFocus: (i: number) => void;
    onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>, i: number) => void;
    clear: () => void;
    setValue: (value: string) => void;
    render(): JSX.Element;
}
export default OTPTextView;
