import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const interval$ = interval(1000);
    const timer$ = timer(3000, 1000);

    timer$.subscribe((val) => console.log('stream 1 =>' + val));

    interval$.subscribe((val) => console.log('stream 2 =>' + val));
    interval$.subscribe((val) => console.log('stream 3 =>' + val));

    const click$ = fromEvent(document, 'click');

    click$.subscribe(
      (evt) => console.log(evt),
      (err) => console.log(err),
      () => console.log('completed')
    );
  }
}
