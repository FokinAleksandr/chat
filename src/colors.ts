export const setOpacity = (hex: string, alpha: number) => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    throw new Error('Bad Hex');
  }

  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  return `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`.toUpperCase();
};

export const colors = {
  white: '#fff',
  cadetBlue: '#ABB4BB',
  electric: '#057EE3',
  charcoal: '#424E58',
  blue: '#45A1F8',
  cultured: '#EEF3F4',
};
