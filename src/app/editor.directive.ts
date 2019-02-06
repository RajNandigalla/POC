import { Directive, OnChanges, Output, EventEmitter, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[ccMarkDown]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(change)': 'onChange($event.target.value)',
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
    },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CCMarkDownDirective),
        multi: true
    }]
})
export class CCMarkDownDirective {
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef
    ) { }


    // Begin ControlValueAccesor methods.
    onChange = (_) => { };
    onTouched = () => { };

    // Form model content changed.
    public writeValue(value: any): void {
        const normalizedValue = value == null ? '' : value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
        console.log(normalizedValue);
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
    // End ControlValueAccesor methods.
}
