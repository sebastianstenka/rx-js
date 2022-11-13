import { Component, OnInit } from '@angular/core';
import { map, noop, Observable } from 'rxjs';
import { createHttpObservable } from '../common/utils';
import { CoursesService } from '../coursesService/courses.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {
    this.beginnerCourses$ = this.coursesService.beginnerCourses$;
    this.advancedCourses$ = this.coursesService.advancedCourses$;
  }

  ngOnInit(): void {}
}
