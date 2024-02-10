import { Injectable } from '@nestjs/common';
import { I18nService } from './i18n/i18n.service';

@Injectable()
export class AppService {
  constructor(private readonly i18Service: I18nService) {}
  getHello(): string {
    return this.i18Service.translate('ERRORS.USER_NOT_FOUND', { firstName: 'Anton  ' });
  }
}
