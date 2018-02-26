import { Injectable } from '@angular/core';

import { BaseMapper } from './base';
import { deepCamelCase } from '~utils';
import {
  IRawClient,
  IClient,
  IClientMenuItem,
  IClientSettings,
  IRawError,
  IError
} from '~schema';

@Injectable()
export class ClientMapper extends BaseMapper<IRawClient | IRawError, IClient | IError> {
  public map(src: IRawClient | IRawError): IClient | IError {
    let data: IClient | IError;

    if ('error_message' in src) {
      data = {
        errorMessage: src.error_message
      };
    } else {
      data = this.getClientData(<IRawClient>src);
    }

    return data;
  }

  private getClientData(data: IRawClient): IClient {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      menu: {
        items: deepCamelCase<IClientMenuItem[]>(data.menu)
      },
      token: data.token,
      settings: deepCamelCase<IClientSettings>(data.settings)
    };
  }
}
