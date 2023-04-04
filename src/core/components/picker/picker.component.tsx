/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {forwardRef} from 'react';
import RNPicker, {PickerOptions} from 'react-native-picker';
import colorConvert from 'color-convert';
import {Modal, Pressable, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Blur} from '../blur/blur.component';
import {styles} from './picker.styles';
import { useAppTheme } from '@app/core/contexts';

export interface PickerDataItem {
  value?: string;
  label: string;
}
export interface PickerProps {
  value?: string;
  open?: boolean;
  setOpen: (open: boolean) => void;
  dataSources: PickerDataItem[];
  onChangeValue?: (value?: string) => void;
}

export const Picker = forwardRef((props: PickerProps, ref: any) => {
  const {t} = useTranslation('common');
  const {appTheme} = useAppTheme();
  const {open, dataSources, setOpen, value: initialValue, onChangeValue} = props;
  const selectedItem = dataSources.find((data) => data.value === initialValue);
  const selectedValue = selectedItem ? [selectedItem.label] : undefined;

  const onClose = (): void => {
    setOpen(false);
  };

  const onPickerConfirm = (items: string[]): void => {
    const item = dataSources.find((data) => data.label === items[0]);
    if (item && item.value !== initialValue && onChangeValue) {
      onChangeValue(item.value);
    }
    onClose();
  };

  const onShow = (): void => {
    const primaryColorHexArr = [...colorConvert.hex.rgb(appTheme.colors.primary), 1];
    const whiteColorHexArr = [...colorConvert.hex.rgb('#fff'), 1];
    const pickerTextColorHexArr = [...colorConvert.hex.rgb(appTheme.colors.text), 1];
    const pickerBackgroundHexArr = [...colorConvert.hex.rgb(appTheme.colors.background), Platform.OS === 'ios' ? 0 : 0.9];
    const pickerData = dataSources.map((data) => data.label);
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
