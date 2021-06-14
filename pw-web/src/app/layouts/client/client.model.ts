import {Moment} from 'moment';

export interface IClient {
  id?: number;
  lastName?: string;
  firstName?: string;
  dateOfBirth?: Date;
  nif?: string;
  clientContact?: IClientContact[];
  clientAddress?: IClientAddress[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public lastName?: string,
    public firstName?: string,
    public dateOfBirth?: Date,
    public nif?: string,
    public clientContact?: IClientContact[],
    public clientAddress?: IClientAddress[]
  ) {}
}

export const enum ContactType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  MOBILE = 'MOBILE',
}

export interface IClientContact {
  id?: number;
  contactType?: ContactType;
  contact?: string;
}

export interface IClientAddress {
  id?: number;
  address?: string;
  postalCode?: string;
}

export class ClientContact implements IClientContact {
  constructor(public id?: number, public contactType?: ContactType, public contact?: string) {}
}
export class ClientAddress implements IClientAddress {
  constructor(public id?: number, public address?: string, public postalcode?: string) {}
}
