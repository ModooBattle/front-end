// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size) => `${size / 16}rem`;

// font size를 객체로 반환해주자.
const fontSizes = {
	title: pixelToRem(60),
	subtitle: pixelToRem(30),
	paragraph: pixelToRem(18)
};

// 자주 사용하는 색을 객체로 만들자.
const colors = {
	black: '#000000',
	grey: '#999999',
	green: '#3cb46e',
	blue: '#000080',
	// -------------------------
	bgBlack: '#1D232A',
	primary: '#FF52D9'
};

// 자주 사용하는 스타일 속성을 theme으로 만들어보자.
const common = {
	flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
	flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `
};

// theme 객체에 감싸서 반환한다.
const theme = {
	fontSizes,
	colors,
	common
};

export default theme;
