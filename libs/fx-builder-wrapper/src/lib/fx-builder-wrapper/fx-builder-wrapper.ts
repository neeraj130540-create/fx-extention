import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FxComponentBuilder, FxForm, FxUtils, FxMode, FxBuilderConfiguration, FxScope } from '@instantsys-labs/fx';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DropdownWithOtherComponent } from './components/dropdown-with-other/dropdown-with-other.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { UploaderCheckboxComponent } from './components/uploader-checkbox/uploader-checkbox.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { DispatchToClinicComponent } from './custom-controls/dispatch-to-clinic/dispatch-to-clinic.component';
import { FxBuilderWrapperService } from './fx-builder-wrapper.service';

@Component({
  selector: 'lib-fx-builder-wrapper',
  imports: [CommonModule, FxComponentBuilder],
  templateUrl: './fx-builder-wrapper.html',
  styleUrl: './fx-builder-wrapper.css',
})
export class FxBuilderWrapper implements OnInit {
   @ViewChild('componentBuilder') componentBuilder!: FxComponentBuilder;
  @Input({ alias: 'fx-form', required: true }) fxForm: FxForm = FxUtils.createNewForm();
  public fxMode: FxMode = FxMode.EDIT;
  public fxConfiguration: FxBuilderConfiguration = {
    settings: true,
    logics: true,
    customControls: true,
  }

  protected readonly FxScope = FxScope;
  protected readonly FxMode = FxMode;
   private fxWrapperService = inject(FxBuilderWrapperService);

 

public ngOnInit(): void {
  const components = [
    { name: 'Dispatch To Clinic', key: 'dispatch-to-clinic', cmp: DispatchToClinicComponent },
    { name: 'Dynamic Table', key: 'dynamic-table', cmp: DynamicTableComponent },
    { name: 'Toggle Button', key: 'toggle-button', cmp: ToggleButtonComponent },
    { name: 'Uploader', key: 'uploader', cmp: UploaderComponent },
    { name: 'Uploader with Checkbox', key: 'uploader-checkbox', cmp: UploaderCheckboxComponent },
    { name: 'Toggle', key: 'toggle', cmp: ToggleComponent },
    { name: 'Date Picker', key: 'lib-date-picker', cmp: DatePickerComponent },
    { name: 'Smartlist with Other', key: 'dropdown-with-other', cmp: DropdownWithOtherComponent }
  ];

  components.forEach(({ name, key, cmp }) => {
    if (!this.fxWrapperService.getComponent(key)) {
      this.fxWrapperService.registerCustomComponent(name, key, cmp);
    }
  });
}


  // constructor(private fxWrapperService: FxBuilderWrapperService) { }

  // public ngOnInit(): void {
  //   if (!Boolean(this.fxWrapperService.getComponent('dispatch-to-clinic'))) {
  //     this.fxWrapperService.registerCustomComponent('Dispatch To Clinic', 'dispatch-to-clinic', DispatchToClinicComponent);
  //   }
  //   if (!Boolean(this.fxWrapperService.getComponent('dynamic-table'))) {
  //     this.fxWrapperService.registerCustomComponent('Dynamic Table', 'dynamic-table', DynamicTableComponent);
  //   }
  //   if (!Boolean(this.fxWrapperService.getComponent('toggle-button'))) {
  //     this.fxWrapperService.registerCustomComponent('Toggle Button', 'toggle-button', ToggleButtonComponent);
  //   }
  //   if (!Boolean(this.fxWrapperService.getComponent('uploader'))) {
  //     this.fxWrapperService.registerCustomComponent('Uploader', 'uploader', UploaderComponent);
  //   }
  //   if (!Boolean(this.fxWrapperService.getComponent('uploader-checkbox'))) {
  //     this.fxWrapperService.registerCustomComponent('Uploader with Checkbox', 'uploader-checkbox', UploaderCheckboxComponent);
  //   }
  //   if (!Boolean(this.fxWrapperService.getComponent('toggle'))) {
  //     this.fxWrapperService.registerCustomComponent('Toggle', 'toggle', ToggleComponent);
  //   }
  //   if (!Boolean(this.fxWrapperService.getComponent('lib-date-picker'))) {
  //     this.fxWrapperService.registerCustomComponent('Date Picker', 'lib-date-picker', DatePickerComponent);
  //   }
  //       if (!Boolean(this.fxWrapperService.getComponent('dropdown-with-other'))) {
  //     this.fxWrapperService.registerCustomComponent('Smartlist with Other', 'dropdown-with-other', DropdownWithOtherComponent);
  //   }
  // };

  public getParsedForm(): FxForm {
    return this.componentBuilder.getParsedForm();
  }

  public getInitializedFxForm(): FxForm {
    return FxUtils.createNewForm(); 
  }
}
