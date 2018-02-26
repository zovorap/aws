import { get as _get_ } from 'lodash';

import { IBranding } from '~schema';
import { transparantize, darken, lighten, getContrastColor } from '~utils';

export class BrandCssService {
  public static getStyles(branding: IBranding): string {
    const brandColor = branding.color;
    const brandColorTransparant = transparantize(branding.color);
    const fontA = _get_(branding, 'fonts.fontA');
    const fontB = _get_(branding, 'fonts.fontB');
    const fontsUrl = `https://fonts.googleapis.com/css?family=${fontA}|${fontB}`;
    const headingFont = _get_(branding, 'fonts.heading');
    const subHeadingFont = _get_(branding, 'fonts.subHeading');

    // const llBrandColor = '#' + lighten(brandColor, 30);
    const lBrandColor = '#' + lighten(brandColor, 15);
    const dBrandColor = '#' + darken(brandColor, 15);
    // const ddBrandColor = '#' + darken(brandColor, 30);

    const textColor = getContrastColor(brandColor);

    // text colors for corresponding backgrounds
    const dTextColor = getContrastColor(dBrandColor);
    const lTextColor = getContrastColor(lBrandColor);
    // const ddTextColor = isLight(ddBrandColor) ? '#333' : '#fff';
    // const llTextColor = isLight(llBrandColor) ? '#333' : '#fff';

    return `
      @import url("${fontsUrl}");

      .lk-brand-text {
        color: ${brandColor} !important;
      }

      .lk-brand-background {
        background-color: ${brandColor} !important;
        color: ${textColor} !important;
      }

      .lk-brand-background.is-transparent {
        background-color: ${brandColorTransparant} !important;
      }

      h1 {
        font-family: ${headingFont} !important;
      }

      h5 {
        color: ${brandColor} !important;
      }

      q,
      blockquote,
      cite,
      .quote {
        font-family: ${subHeadingFont} !important;
      }

      .lk-brand-btn.btn-primary {
        background-color: ${brandColor} !important;
        border-color: ${brandColor} !important;
        color: ${textColor} !important;
      }

      .lk-brand-btn.btn-primary:hover {
        background-color: ${dBrandColor} !important;
        border-color: ${dBrandColor} !important;
        color: ${dTextColor} !important;
      }

      .lk-brand-btn.btn-subtle {
        border-color: ${brandColor} !important;
        color: ${brandColor} !important;
      }

      .lk-brand-btn.btn-subtle:hover {
        border-color: ${dBrandColor} !important;
        color: ${dBrandColor} !important;
      }
    `;
  }
}

