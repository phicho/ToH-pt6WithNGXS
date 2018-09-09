import { State, StateContext, Action } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetHeros } from './actions';

@State<Heros>({
    name: 'heros',
    defaults: {
    }
})
export class HerosState {
    constructor() { }

    @Action(GetHeros)
    getHeros(ctx: StateContext<Heros>) {
        return of();
    }
}
