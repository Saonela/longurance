import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextInput from './TextInput';
import appStyles from '../../styles';
import moment from 'moment/moment';
import theme from '../../theme';

function DatePicker({value, onChange}) {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        if (value) {
            setDate(new Date(value));
        }
    }, [value]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        onChange(date);
    };

    return (
        <View>
            <TextInput
                disabled
                style={{...appStyles.inputField, ...{borderBottomWidth: 0}}}
                placeholder={moment(date).format('YYYY-MM-DD HH:mm')}
                placeholderTextColor={theme.COLORS.FONT_PRIMARY}
                testID={'datepicker-trigger'}
                onPress={showDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={date}
                testID={'datepicker'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

export default DatePicker;
