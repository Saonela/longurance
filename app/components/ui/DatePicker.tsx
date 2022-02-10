import React, {useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';
import TextInput from '../shared/TextInput';
import appStyles from '../../styles';
import theme from '../../theme';

interface DatePickerProps {
    value: string;
    onChange: (value: Date) => void;
}

function DatePicker({value, onChange}: DatePickerProps) {
    const date = value ? new Date(value) : new Date();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (chosenDate: Date) => {
        hideDatePicker();
        onChange(chosenDate);
    };

    return (
        <View>
            <TextInput
                disabled
                style={[appStyles.inputField, {borderBottomWidth: 0}]}
                placeholder={moment(date).format('YYYY-MM-DD HH:mm')}
                placeholderTextColor={theme.COLORS.FONT_PRIMARY}
                testID="datepicker-trigger"
                onPress={showDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={date}
                testID="datepicker"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

export default DatePicker;
