import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[tendency]"
})
export class TendencyDirective {
  @Input()  state;
  constructor(private elementRef: ElementRef) {
  }

  @HostListener("mouseover") onMouseIn(): void {
    if (this.state === 1) {
      this.setBackgroundColor("#ffb8b8", 0.6, 500);
    }
    if (this.state === 2) {
      this.setBackgroundColor("#d9ffb6", 0.6, 500);
    }
  }

  @HostListener("mouseleave") onMouseOut(): void {
    this.setBackgroundColor("transparent", 1, 300);
  }

  setBackgroundColor(color: string, opacity: number, fontWeight: number): void {
    this.elementRef.nativeElement.style.backgroundColor = color;
    this.elementRef.nativeElement.style.opacity = opacity;
    this.elementRef.nativeElement.style.fontWeight = fontWeight;
  }
}
