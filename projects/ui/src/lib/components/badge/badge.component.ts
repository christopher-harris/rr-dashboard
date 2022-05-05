import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {BadgeColor} from './badge.model';

@Component({
  selector: 'rr-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit, AfterViewInit {
  @ViewChild('badgeElement') element: ElementRef;
  @Input() color: BadgeColor = 'primary';
  @Input() pillBadge: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.element.nativeElement, `bg-${this.color}`);
    if (this.pillBadge) {
      this.renderer.addClass(this.element.nativeElement, 'rounded-pill');
    }
  }



}
