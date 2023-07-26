import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        height: 50,
        width: 50,
        borderBottomWidth: 4,
        margin: 5,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '500',
        color: '#000000',
    },
});
const DEFAULT_TINT_COLOR = '#3CB371';
const DEFAULT_OFF_TINT_COLOR = '#DCDCDC';
const DEFAULT_TEST_ID_PREFIX = 'otp_input_';
const DEFAULT_KEYBOARD_TYPE = 'numeric';
class OTPTextView extends Component {
    static defaultProps = {
        defaultValue: '',
        inputCount: 4,
        tintColor: DEFAULT_TINT_COLOR,
        offTintColor: DEFAULT_OFF_TINT_COLOR,
        inputCellLength: 1,
        containerStyle: {},
        textInputStyle: {},
        handleTextChange: () => { },
        keyboardType: DEFAULT_KEYBOARD_TYPE,
        testIDPrefix: DEFAULT_TEST_ID_PREFIX,
        autoFocus: false,
    };
    inputs;
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: 0,
            otpText: this.getOTPTextChucks(props.inputCount || 4, props.inputCellLength, props.defaultValue),
        };
        this.inputs = [];
        this.checkTintColorCount();
    }
    getOTPTextChucks = (inputCount, inputCellLength, text) => {
        let matches = text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];
        return matches.slice(0, inputCount);
    };
    checkTintColorCount = () => {
        const { tintColor, offTintColor, inputCount } = this.props;
        if (typeof tintColor !== 'string' && tintColor.length !== inputCount) {
            throw new Error("If tint color is an array it's length should be equal to input count");
        }
        if (typeof offTintColor !== 'string' && offTintColor.length !== inputCount) {
            throw new Error("If off tint color is an array it's length should be equal to input count");
        }
    };
    basicValidation = (text) => {
        const validText = /^[0-9a-zA-Z]+$/;
        return text.match(validText);
    };
    onTextChange = (text, i) => {
        const { inputCellLength, inputCount, handleTextChange } = this.props;
        if (text.length === inputCount) {
            // paste event
            this.setState(() => {
                return {
                    otpText: text.split(''),
                };
            }, () => {
                handleTextChange(this.state.otpText.join(''));
                this.inputs[this.inputs.length - 1].focus();
            });
            return;
        }
        if (text && !this.basicValidation(text)) {
            return;
        }
        this.setState((prevState) => {
            let { otpText } = prevState;
            otpText[i] = text;
            return {
                otpText,
            };
        }, () => {
            handleTextChange(this.state.otpText.join(''));
            if (text.length === inputCellLength && i !== inputCount - 1) {
                this.inputs[i + 1].focus();
            }
        });
    };
    onInputFocus = (i) => {
        const { otpText } = this.state;
        const prevIndex = i - 1;
        if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
            this.inputs[prevIndex].focus();
            return;
        }
        this.setState({ focusedInput: i });
    };
    onKeyPress = (e, i) => {
        const val = this.state.otpText[i] || '';
        const { handleTextChange, inputCellLength, inputCount } = this.props;
        const { otpText } = this.state;
        if (e.nativeEvent.key !== 'Backspace' && val && i !== inputCount - 1) {
            this.inputs[i + 1].focus();
            return;
        }
        if (e.nativeEvent.key === 'Backspace' && i !== 0) {
            if (!val.length && otpText[i - 1].length === inputCellLength) {
                this.setState(prevState => {
                    let { otpText } = prevState;
                    otpText[i - 1] = otpText[i - 1]
                        .split('')
                        .splice(0, otpText[i - 1].length - 1)
                        .join('');
                    return {
                        otpText,
                    };
                }, () => {
                    handleTextChange(this.state.otpText.join(''));
                    this.inputs[i - 1].focus();
                });
            }
        }
    };
    clear = () => {
        this.setState({
            otpText: [],
        }, () => {
            this.inputs[0].focus();
            this.props.handleTextChange('');
        });
    };
    setValue = (value) => {
        const { inputCount, inputCellLength } = this.props;
        const updatedFocusInput = value.length - 1;
        this.setState({
            otpText: this.getOTPTextChucks(inputCount, inputCellLength, value),
        }, () => {
            if (this.inputs[updatedFocusInput]) {
                this.inputs[updatedFocusInput].focus();
            }
            this.props.handleTextChange(value);
        });
    };
    render() {
        const { inputCount, offTintColor, tintColor, defaultValue, inputCellLength, containerStyle, textInputStyle, keyboardType, testIDPrefix, autoFocus, ...textInputProps } = this.props;
        const { focusedInput, otpText } = this.state;
        const TextInputs = [];
        for (let i = 0; i < inputCount; i += 1) {
            const _tintColor = typeof tintColor === 'string' ? tintColor : tintColor[i];
            const _offTintColor = typeof offTintColor === 'string' ? offTintColor : offTintColor[i];
            const inputStyle = [
                styles.textInput,
                textInputStyle,
                {
                    borderColor: _offTintColor,
                },
            ];
            if (focusedInput === i) {
                inputStyle.push({
                    borderColor: _tintColor,
                });
            }
            TextInputs.push(<TextInput ref={e => {
                    if (e) {
                        this.inputs[i] = e;
                    }
                }} key={i} autoCorrect={false} keyboardType={keyboardType} autoFocus={autoFocus && i === 0} value={otpText[i] || ''} style={inputStyle} maxLength={inputCount} onFocus={() => this.onInputFocus(i)} onChangeText={text => this.onTextChange(text, i)} multiline={false} onKeyPress={e => this.onKeyPress(e, i)} selectionColor={_tintColor} {...textInputProps} testID={`${testIDPrefix}${i}`}/>);
        }
        return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
    }
}
export default OTPTextView;
