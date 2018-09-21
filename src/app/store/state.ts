import { State, StateContext, Action } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetHeros, GetHero, UpdateHero, AddHero, DeleteHero } from './actions';
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

    @Action(AddHero)
    addHero(ctx: StateContext<Heroes>, action: AddHero) {
        return this.heroService.addHero(action.hero)
            .subscribe((h) => {
                const state = ctx.getState();

                const current = {
                    list: [...state.list, h]
                };

                ctx.setState({
                    ...state,
                    ...current
                });
            });
    }

    @Action(DeleteHero)
    DeleteHero(ctx: StateContext<Heroes>, action: DeleteHero) {
        return this.heroService.deleteHero(action.hero)
            .subscribe(() => {
                const state = ctx.getState();

                const current = {
                    list: state.list.filter(hero => hero.id !== action.hero.id)
                };

                ctx.setState({
                    ...state,
                    ...current
                });
            });
    }
}
