import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string = "";
  @Output() changed = new EventEmitter<string>();

  value: string = "";
  isDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // onKeyup(value: string): void {
  //   this.value = value;
  //   this.propagateChange(value);
  //   this.changed.emit(value);
  // }

  onKeyup(event: KeyboardEvent): void {
    const eventValue = (event.target as HTMLInputElement).value;
    this.value = (event.target as HTMLInputElement).value;
    this.propagateChange(eventValue);
    this.changed.emit(eventValue);
  }

  onBlur(): void {
    this.propagateTouched();
  }
 }