import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Store } from '@ngxs/store';
import { GetHeros } from '../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  private heroList$ = this.store.select(store => store.heroes.list)

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetHeros());
    this.heroList$.subscribe(heroes => {
      this.heroes = heroes.slice(1, 5)
    })
  }
}
