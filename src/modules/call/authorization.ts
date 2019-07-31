
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable()
export class Authorization implements CanActivate {
  constructor(
    private readonly configService: ConfigService
  ) { }
  private readonly authToken = this.configService.get('CALL_ENDPOINT_AUTHORIZATION_TOKEN');
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request): boolean {
    const auth = request.headers && request.headers.authorization;
    if (!auth || !this.authToken) return false;

    return auth === this.authToken;
  }

}

