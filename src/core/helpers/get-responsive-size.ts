import { Dimensions, PixelRatio } from 'react-native';
let Width = Dimensions.get('window').width;
let Height = Dimensions.get('window').height;

const wp = (widthPercent: string | number) => {
	const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
	return PixelRatio.roundToNearestPixel(Width * elemWidth / 100);
};

const hp = (heightPercent: string | number) => {
	const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

	return PixelRatio.roundToNearestPixel(Height * elemHeight / 100);
};
export {
	wp, hp
}
