export function lighten(color = '000', percent?: number): string {
  let hsl = hexToHsl(checkHex(color));

  if (!!percent) {
    hsl[2] = (hsl[2] * 100) + percent;
    hsl[2] = (hsl[2] > 100) ? 1 : hsl[2] / 100;
  } else {
    hsl[2] += (1 - hsl[2]) / 2;
  }

  return hslToHex(hsl);
}

export function darken(color = 'fff', percent: number): string {
  let hsl = hexToHsl(checkHex(color));

  if (!!percent) {
    hsl[2] = (hsl[2] * 100) - percent;
    hsl[2] = (hsl[2] < 0) ? 0 : hsl[2] / 100;
  } else {
    hsl[2] = hsl[2] / 2;
  }

  return hslToHex(hsl);
}

export function getBrightness(hex: string): number {
  let rgb = hexToRgb(checkHex(hex));

  return (((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
}

export function isContrast(color1: string, color2: string): boolean {
  // For maximum readability, the difference between
  // the background brightness and the foreground brightness
  // should be greater than 125.

  return getBrightnessDiff(checkHex(color1), checkHex(color2)) > 125;
}

export function isLight(color: string): boolean {
  let hex = checkHex(color);
  let r = parseInt(hex[0] + hex[1], 16);
  let g = parseInt(hex[2] + hex[3], 16);
  let b = parseInt(hex[4] + hex[5], 16);

  return ((r * 299 + g * 587 + b * 114) / 1000 > 130);
}

export function isDark(color: string): boolean {
  return !isLight(color);
}

export function getContrastColor(color: string): string {
  return isDark(color) ? '#fff' : '#222';
}

export function humanToHex(colorName: string): string {
  const colors = {
    black: '#000',
    ddGray: '#222',
    dGray: '#3b3b3b',
    gray: '#4f4f4f',
    lGray: '#6a6a6a',
    llGray: '#b1b1b1',
    lllGray: '#ebebeb',
    ddBlue: '#11151a',
    dBlue: '#054c70',
    blue: '#086ea1',
    lBlue: '#05c3de',
    teal: '#008080',
    orange: '#ff6600',
    mustard: '#daaa00',
    red: '#da291c',
    green: '#00843d',
    lGreen: '#dfeae3',
    white: '#fff'
  };

  return colors[colorName];
}

export function transparantize(hex: string) {
  const rgb = hexToRgb(checkHex(hex));

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, .8)`;
}

// export function mix(hex1: string, hex2: string, amount: number): string {
//   let rgb1 = hexToRgb(hex1);
//   let rgb2 = hexToRgb(hex2);

//   let r1 = (amount + 100) / 100;
//   let r2 = 2 - r1;

//   let rmix = ((rgb1['R'] * r1) + (rgb2['R'] * r2)) / 2;
//   let gmix = ((rgb1['G'] * r1) + (rgb2['G'] * r2)) / 2;
//   let bmix = ((rgb1['B'] * r1) + (rgb2['B'] * r2)) / 2;

//   return rgbToHex([rmix, gmix, bmix]);
// }

// export function complementary(color: string): string {
//   let hsl = hexToHsl(color);

//   hsl[0] += (hsl[0] > 180) ? -180 : 180;

//   return hslToHex(hsl);
// }

// export function trio(hex: string): string[] {
//   let colors = monochromatic(hex, 3);

//   let ret = [];

//   colors.forEach((color, i) => {
//     ret.push(color);
//   });

//   if (getBrightness(hex) > 178 / 2) {
//     ret.push('#222222');
//   } else {
//     ret.push('#ffffff');
//   }

//   return ret;
// }

function getBrightnessDiff(color1: string, color2: string): number {
  return Math.abs(getBrightness(color1) - getBrightness(color2));
}

function hexToRgb(hex: string): number[] {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

function hexToHsl(hex: string): number[] {
  let color = checkHex(hex);
  let rgb = hexToRgb(color);

  return rgbToHsl(rgb);
}

// function hexToHsv(hex: string): number[] {
//   let color = checkHex(hex);

// let r = parseInt(color[0] + color[1], 16);
// let g = parseInt(color[2] + color[3], 16);
// let b = parseInt(color[4] + color[5], 16);

//   let hsv = [];

//   let rr = (r / 255);
//   let gg = (g / 255);
//   let bb = (b / 255);

//   let max = Math.max(rr, gg, bb);
//   let min = Math.min(rr, gg, bb);

//   let h = 0;
//   let s = 0;
//   let v = max;

//   let delta = max - min;
//   s = max === 0 ? 0 : delta / max;

//   if (max === min) {
//     h = 0; // achromatic
//   } else {
//     switch (max) {
//       case rr:
//         h = (gg - bb) / delta + (gg < bb ? 6 : 0);
//         break;
//       case gg:
//         h = (bb - rr) / delta + 2;
//         break;
//       case bb:
//         h = (rr - gg) / delta + 4;
//         break;
//     }

//     h /= 6;
//   }

//   return [h * 360, s, v];
// }

function rgbToHsl(rgb: number[]): number[] {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);
  let delta = max - min;

  let h;
  let s;
  let l = (max + min) / 2;

  if (delta === 0) {
    h = 0;
    s = 0;
  } else {
    if (l < 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }

    let deltaR = (((max - r) / 6) + (delta / 2)) / delta;
    let deltaG = (((max - g) / 6) + (delta / 2)) / delta;
    let deltaB = (((max - b) / 6) + (delta / 2)) / delta;

    if (r === max) {
      h = deltaB - deltaG;
    } else if (g === max) {
      h = (1 / 3) + deltaR - deltaB;
    } else if (b === max) {
      h = (2 / 3) + deltaG - deltaR;
    }

    if (h < 0) {
      h++;
    }

    if (h > 1) {
      h--;
    }
  }

  return [
    (h * 360),
    s,
    l
  ];
}

// function rgbToHex(rgb: number[]): string {
//   let hsl = rgbToHsl(rgb);
//   return hslToHex(hsl);
// }

function hslToHex(hsl: number[]): string {
  let [h, s, l] = [hsl[0] / 360, hsl[1], hsl[2]];
  let r;
  let g;
  let b;

  if (s === 0) {
    r = l * 255;
    g = l * 255;
    b = l * 255;
  } else {
    let p;
    let q;

    if (l < 0.5) {
      q = l * (1 + s);
    } else {
      q = (l + s) - (s * l);
    }

    p = 2 * l - q;

    r = Math.round(255 * hueToRgb(p, q, h + (1 / 3)));
    g = Math.round(255 * hueToRgb(p, q, h));
    b = Math.round(255 * hueToRgb(p, q, h - (1 / 3)));
  }

  r = Math.round(r).toString(16);
  g = Math.round(g).toString(16);
  b = Math.round(b).toString(16);

  r = (r.length === 1) ? '0' + r : r;
  g = (g.length === 1) ? '0' + g : g;
  b = (b.length === 1) ? '0' + b : b;

  return r + g + b;
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) {
    t += 1;
  } else if (t > 1) {
    t -= 1;
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  } else if (t < 1 / 2) {
    return q;
  } else if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }

  return p;
}

// function hsvToRgb(hsv: number[]): number[] {
//   let h = (hsv[0] / 360) * 6;
//   let s = (hsv[1] * 100) / 100;
//   let v = (hsv[2] * 100) / 100;

//   let i = Math.floor(h);
//   let f = h - i;
//   let p = v * (1 - s);
//   let q = v * (1 - f * s);
//   let t = v * (1 - (1 - f) * s);
//   let mod = i % 6;
//   let r = [v, q, p, p, t, v][mod];
//   let g = [t, v, v, q, p, p][mod];
//   let b = [p, p, t, v, v, q][mod];

//   return [r * 255, g * 255, b * 255];
// }

// function hsvToHex(hsv: number[]): string {
//   let rgb = hsvToRgb(hsv);
//   return rgbToHex(rgb);
// }

// function monochromatic(hex: string, results = 6): string[] {
//   let hsv = hexToHsv(hex);

//   let ret = [];
//   let modification = 1 / results;

//   while (results--) {
//     let color = hsvToHex(hsv);
//     ret.push(color);

//     hsv[2] = (hsv[2] + modification);
//     if (hsv[2] > 1) {
//       hsv[2] -= 1;
//     }
//   }

//   return ret;
// }

function checkHex(hex: string): string {
  let color = hex.replace('#', '');

  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  } else if (color.length !== 6) {
    return null;
  }

  return color;
}
