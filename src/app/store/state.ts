import { State, StateContext, Action } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetHeros, GetHero, UpdateHero } from './actions';
import { HeroService } from '../hero.service';
import { Heroes } from './interfaces';

@State<Heroes>({
    name: 'heroes',
    defaults: {
        list: [],
        selected: null
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

    @Action(GetHero)
    getHero(ctx: StateContext<Heroes>, action: GetHero) {
        return this.heroService.getHero(action.id)
            .pipe(tap((result) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    selected: result
                });
            }));
    }

    @Action(UpdateHero)
    updateHero(ctx: StateContext<Heroes>, action: UpdateHero) {
        return this.heroService.updateHero(action.hero)
            .pipe(tap(() => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    selected: action.hero
                });
            }));
    }
}
