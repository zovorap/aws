// export interface IRawAboutMe {
//   image: string;
//   logo: string;
//   bio: string;
//   title: string;
//   embed_video: string;
// }

export interface IRawAgentInfo {
  description: string;
  tags: string[];
  name_on_site: string;
  title: string;
  tagline: string;
  main_phone_number: string;
  mobile_phone_number: string;
  office_phone_number: string;
  primary_email: string;
  display_email: string;
  secondary_display_email: string;
  office_address: string;
  agency_logo: string;
  social_media: IRawSocialMedia[];
  markets: IRawMarket[];
  agencies: IRawAgency[];
}

export interface IRawBranding {
  color: string;
  fonts: {
    fontA: string,
    fontB: string,
    fontC: string,
    heading: string,
    subHeading: string,
  };
}

export interface IRawClient {
  id: string;
  first_name: string;
  last_name: string;
  menu: IRawClientMenuItem[];
  token: string;
  settings: IRawClientSettings;
  error_message: string;
}

interface IRawClientSettings {
  send_matching_listings: boolean;
}

// export interface IRawClosedTransactions {
//   display_original_price: number;
//   display_region: number;
//   display_order: string;
//   display_buy_sales: number;
// }

export interface IRawError {
  error_message: string;
}

export interface IRawFooter {
  background_color: string;
  disclaimer: string;
  layout: string;
}

export interface IRawHeader {
  background_color: string;
  logo: string;
  layout: string;
  sections: string[];
}

// export interface IRawHomePage {
//   id: number;
//   website_id: number;
//   open_house: number;
//   contact_form: number;
//   contact_form_open_houses: number;
//   contact_form_confirmation: string;
//   social_feed_twitter: number;
//   social_feed_facebook: number;
//   social_feed_testimonials: number;
//   about: number;
//   about_image: string;
//   about_description: string;
//   about_display_main_phone: number;
//   about_display_mobile_phone: number;
//   map_option: string;
//   search_box: string;
//   agent_box: number;
//   main_section_mixed_layout: string;
//   featured_properties: number;
//   featured_properties_search_id: string;
//   featured_remove_sold: number;
//   latitude: number;
//   longitude: number;
//   details: {
//     widget_order: string[]
//   };
//   created_at: string;
//   updated_at: string;
// }

// export interface IRawMyExclusives {
//   for_sale: number;
//   include_closed_sale: number;
//   include_closed_rent: number;
//   for_rent: number;
//   display_order: string;
//   contact_box_style: string;
// }

export interface IRawNavItem {
  url: string;
  label: string;
  items?: IRawNavItem[];
}

export interface IRawWebsiteSettings {
  agent_info: IRawAgentInfo;
  branding: IRawBranding;
  favicon: string;
  footer: IRawFooter;
  header: IRawHeader;
  id: number;
  nav: IRawNavItem[];
  title: string;
}

interface IRawClientMenuItem {
  url: string;
  label: string;
  icon: string;
  isPopup?: boolean;
}

interface IRawMarket {
  id: number;
  label: string;
}

interface IRawAgency {
  name: string;
  phone: string;
  address: string;
}

interface IRawSocialMedia {
  type: string;
  account: string;
}
