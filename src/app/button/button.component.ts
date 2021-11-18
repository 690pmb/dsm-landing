import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { App } from '../application';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('name')
  name: ElementRef<HTMLElement>;
  @HostListener('mouseover') onMouseEnter(): void {
    this.updateBtnColor('0.4');
  }
  @HostListener('mouseout') onMouseOut(): void {
    this.updateBtnColor('0.8');
  }
  @Input() app: App;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!this.app.url.includes('http')) {
      this.app.url = `https://${this.app.url}${environment.baseUrl}`;
    }
    this.app.icon = this.app.icon.includes(' ')
      ? this.app.icon
      : `fas fa-${this.app.icon}`;
  }

  ngAfterViewInit(): void {
    this.name.nativeElement.style.color = this.hexToRgb(this.app.color, '0.8');
    this.name.nativeElement.style.filter = 'invert(100%)';
    this.updateBtnColor('0.8');
  }

  updateBtnColor(alpha: string) {
    this.elRef.nativeElement.style.backgroundColor = this.hexToRgb(
      this.app.color,
      alpha
    );
  }

  hexToRgb(hex: string, alpha: string): string {
    if (hex.length !== 6) {
      return `rgba(0,0,0,${alpha})`;
    } else {
      const rgb: string[] = [];
      let i = 0;
      while (i < 3) {
        rgb.push(Number('0x' + hex.slice(i * 2, (i + 1) * 2)).toString(10));
        i++;
      }
      return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
    }
  }
}
