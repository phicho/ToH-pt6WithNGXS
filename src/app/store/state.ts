import { State, StateContext, Action } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetHeros } from './actions';
import { HeroService } from '../hero.service';
import { Heroes } from './interfaces';

@State<Heroes>({
    name: 'heroes',
    defaults: {
        list: []
    }
})
export class HeroesState {
    constructor(private heroService: HeroService) { }

    @Action(GetHeros)
    getHeros(ctx: StateContext<Heroes>) {
        return this.heroService.getHeroes()
            .pipe(tap((result) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    list: result
                });
            }));
    }
}
