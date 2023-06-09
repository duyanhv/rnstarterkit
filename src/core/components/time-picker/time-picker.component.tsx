/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {forwardRef} from 'react';
import RNPicker, {PickerOptions} from 'react-native-picker';
import dayjs from 'dayjs';
import colorConvert from 'color-convert';
import {Modal, Pressable, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './time-picker.styles';
import { Blur } from '../blur/blur.component';
import { useAppTheme } from '../../contexts';

export interface TimePickerDataItem {
  value: Date;
  label: string;
}
export interface TimePickerProps {
  value?: Date;
  open?: boolean;
  setOpen: (open: boolean) => void;
  onChangeValue?: (value: Date) => void;
}

const createPickerData = (): string[][] => {
  const pickerData = [
    Array.from(new Array(24), (x, i) => i.toString()),
    Array.from(new Array(60), (x, i) => i.toString()),
  ];
  return pickerData;
};

export const TimePicker = forwardRef((props: TimePickerProps, ref: any) => {
  const {open, setOpen, value: initialValue, onChangeValue} = props;
  const {t} = useTranslation('common');
  const {appTheme} = useAppTheme()
  const date = initialValue || new Date();
  const selectedValue = [date.getHours().toString(), date.getMinutes().toString()];

  const onClose = (): void => {
    setOpen(false);
  };

  const onPickerConfirm = (items: string[]): void => {
    const newDate = dayjs(initialValue)
      .set('hour', +items[0])
      .set('minute', +items[1]);
    const currentDate = dayjs(initialValue);
    if (!newDate.isSame(currentDate) && onChangeValue) {
      onChangeValue(
        currentDate
          .set('hour', newDate.hour())
          .set('minute', newDate.minute())
          .set('second', 0)
          .set('millisecond', 0)
          .toDate(),
      );
    }
    onClose();
  };

  const onShow = (): void => {
    const primaryColorHexArr = [...colorConvert.hex.rgb(appTheme.colors.primary), 1];
    const whiteColorHexArr = [...colorConvert.hex.rgb('#fff'), 1];
    const pickerTextColorHexArr = [...colorConvert.hex.rgb(appTheme.colors.text), 1];
    const pickerBackgroundHexArr = [...colorConvert.hex.rgb(appTheme.colors.background), Platform.OS === 'ios' ? 0 : 0.9];
    const pickerData = createPickerData();
    const pickerOptions: PickerOptions = {
      pickerConfirmBtnText: t('select') as string,
      pickerCancelBtnText: t('cancel') as string,
      pickerTitleText: '',
      pickerBg: pickerBackgroundHexArr,
      pickerFontColor: pickerTextColorHexArr,
      pickerToolBarBg: primaryColorHexArr,
      pickerTitleColor: whiteColorHexArr,
      pickerCancelBtnColor: whiteColorHexArr,
      pickerConfirmBtnColor: whiteColorHexArr,
      pickerData,
      onPickerConfirm,
      onPickerCancel: onClose,
      selectedValue,
    };
    RNPicker.init(pickerOptions);
    RNPicker.show();
  };

  return (
    <Modal
      ref={ref}
      transparent
      animated
      visible={open}
      onShow={onShow}
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
      <Pressable onPress={onClose} style={styles.flex}>
        <Blur />
      </Pressable>
    </Modal>
  );
});
