import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.scss']
})
export class ErrorScreenComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public code: number;

  public message: string;

  ngOnInit(): void {
    this.route.data.subscribe(
      ({CODE, MESSAGE}) => {
        this.code = CODE;
        this.message = MESSAGE;
      }
    );
  }

}
