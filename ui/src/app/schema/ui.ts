import { RequestOptionsArgs } from '@angular/http';

import { FormGroup, FormControl } from '@angular/forms';

export interface IAction {
  type: string;
  [name: string]: any;
}

export interface IAgency {
  name: string;
  phone: string;
  address: string;
}

export interface IAgentInfo {
  description: string;
  tags: string[];
  nameOnSite: string;
  title: string;
  tagline: string;
  mainPhoneNumber: string;
  mobilePhoneNumber: string;
  officePhoneNumber: string;
  primaryEmail: string;
  displayEmail: string;
  secondaryDisplayEmail: string;
  officeAddress: string;
  agencyLogo: string;
  socialMedia: ISocialMedia[];
  markets: IMarket[];
  agencies: IAgency[];
}

export interface IApi {
  numberOfActiveRequests: number;
}

export interface IAppState {
  agentInfo?: IAgentInfo;
  api?: IApi;
  branding?: IBranding;
  client?: IClient;
  favicon?: string;
  footer?: IFooter;
  forms?: IForms;
  modal?: IModal;
  nav?: INav;
  header?: IHeader;
  title?: string;
  toast?: IToast;
}

export interface IBranding {
  color: string;
  fonts: {
    fontA: string,
    fontB: string,
    fontC: string,
    heading: string,
    subHeading: string,
  };
}

export interface IClient {
  id?: string;
  firstName?: string;
  lastName?: string;
  menu?: IClientMenu;
  token?: string;
  settings?: IClientSettings;
}

export interface IClientSettings {
  sendMatchingListings: boolean;
}

export interface IClientMenu {
  isExpanded?: boolean;
  items: IClientMenuItem[];
}

export interface IClientMenuItem {
  url: string;
  label: string;
  icon: string;
  isPopup?: boolean;
}

export interface IError {
  errorMessage: string;
}

export interface IField {
  type: 'text' | 'password' | 'number' | 'tel' | 'checkbox' | 'textarea';
  control: FormControl;
  value: string | number | boolean;
  label: string;
  guidanceText?: string;
  validationMessages: {
    [name: string]: string
  };
}

export interface IFooter {
  backgroundColor: string;
  disclaimer: string;
  layout: string;
}

export interface IForm {
  id: string;
  form: FormGroup;
  submitAttempts: number;
}

export interface IForms {
  [name: string]: IForm;
}

export interface IHeader {
  backgroundColor: string;
  logo: string;
  layout: string;
  sections: string[];
}

export interface IModal {
  id: number;
  isActive: boolean;
  isVisible: boolean;
  hasControls: boolean;
  title?: string;
  cssClass?: string;
  confirmButton?: string;
  cancelButton?: string;
  tpl?: string;
  url?: string;
}

interface IModalBaseSettings {
  hasControls?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  cssClass?: string;
  confirmButton?: string;
  cancelButton?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface IModalFromTemplateSettings extends IModalBaseSettings {
  tpl: string;
  url?: never;
}

interface IModalFromUrlSettings extends IModalBaseSettings {
  tpl?: never;
  url: string;
}

export type IModalSettings = IModalFromTemplateSettings | IModalFromUrlSettings;

export interface INav {
  isExpanded?: boolean;
  items?: INavItem[];
}

export interface INavItem {
  url: string;
  label: string;
  items?: INavItem[];
  isExpanded?: boolean;
}

export interface IResponse {
  [name: string]: any;
}

export interface ISocialMedia {
  type: string;
  account: string;
}

export interface IToast {
  isActive?: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  lifeTime?: number;
  message: string;
}

export interface IValidationMessages {
  required?: string;
  email?: string;
  min?: string;
  max?: string;
  number?: string;
}

export interface IWebsiteSettings {
  agentInfo?: IAgentInfo;
  branding?: IBranding;
  favicon?: string;
  footer?: IFooter;
  header?: IHeader;
  id?: number;
  nav?: INav;
  title?: string;
}

interface IMarket {
  id: number;
  label: string;
}

