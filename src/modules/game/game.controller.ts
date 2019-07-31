import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { CallService } from '../call/call.service';
import { IGame } from './interfaces/game.interface'


@Controller('games')
export class GameController {

  constructor(
    private readonly gameService: GameService,
    private readonly callService: CallService,
  ) { }

  @Get('/')
  async getGameInfo(): Promise<IGame[]> {
    try {
      this.callService.saveCallInputToDb();
      return await this.gameService.getGames();
    } catch (e) {
      throw Error(e);
    }
  }
}
