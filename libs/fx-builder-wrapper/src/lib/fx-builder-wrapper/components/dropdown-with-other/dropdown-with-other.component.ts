import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FxBaseComponent, FxComponent, FxSelectSetting, FxSetting, FxStringSetting, FxValidation, FxValidatorService } from '@instantsys-labs/fx';
import { FxBuilderWrapperService } from '../../fx-builder-wrapper.service';
import { CalendarModule } from 'primeng/calendar';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceRegistry } from '@instantsys-labs/core'

@Component({
  selector: 'dropdown-with-other',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FxComponent, CalendarModule],
  templateUrl: './dropdown-with-other.component.html',
  styleUrl: './dropdown-with-other.component.css'
})
export class DropdownWithOtherComponent extends FxBaseComponent implements OnInit, AfterViewInit {
private fb = inject(FormBuilder);
private destroy$ = new Subject<Boolean>();
formObject: object = {};
// options = [
//       { optionValue: 'Clinical Notes 1', optionName: 'Clinical Notes 1' },
//       { optionValue: 'Clinical Notes 2', optionName: 'Clinical Notes 2' },
//       { optionValue: 'Clinical Notes 3', optionName: 'Clinical Notes 3' },
//       { optionValue: 'other', optionName: 'Other' }
// ];

options: any[] = [];

     public dropDownForm: FormGroup = this.fb.group({
   selectedOption:['', Validators.required],
  otherInput: [{ value: '', disabled: true }],
});

  constructor(private cdr: ChangeDetectorRef,private http: HttpClient,private fxBuilderWrapperService: FxBuilderWrapperService,private fxApiService: ApiServiceRegistry) {
        super(cdr)
        this.onInit.subscribe(() => {
          this._register(this.dropDownForm);
        });
       
      }
  ngAfterViewInit(): void {
    setTimeout(()=>{
 this.dropDownForm.patchValue(this.formObject);
    },100)
   
  }

  ngOnInit(): void {
      this.fxBuilderWrapperService.variables$
     .pipe(takeUntil(this.destroy$))
     .subscribe((variables: any) => {
       if (!variables) return;
   
   
       for (const [key, value] of Object.entries(variables) as [string, any][]) {
         if (key.includes('dropdown-with-other')) {
          this.formObject = value;
         }
       }
  })

  //  this.dropDownForm.get('selectedOption')?.valueChanges.subscribe(value => {
  //   const otherControl = this.dropDownForm.get('otherInput');
  //   if (value === 'other') {
  //     otherControl?.enable();
  //   } else {
  //     otherControl?.disable();
  //     otherControl?.reset();
  //   }
  // });
  const serviceUrl = this.fxApiService.getServiceUrl(this.setting('serviceName'));
  this.getOptions(serviceUrl,this.setting('clinicalNotesURL'));

  this.dropDownForm.get('selectedOption')?.valueChanges.subscribe(value => {
  const otherControl = this.dropDownForm.get('otherInput');

  if (value === 'other') {
    otherControl?.enable();
    otherControl?.setValidators([Validators.required]);
  } else {
    otherControl?.disable();
    otherControl?.reset();
    otherControl?.clearValidators(); //
  }

  otherControl?.updateValueAndValidity(); //
  otherControl?.markAsTouched();
});

}

      protected settings(): FxSetting[] {
          return [
            new FxStringSetting({ key: 'clinicalNotesURL', $title: 'API Url', value: '' }),
            new FxStringSetting({ key: 'customClass', $title: 'Custom Class Name', value: '' }),
             new FxStringSetting({ key: 'select-label', $title: 'Label', value: '' }), 
             new FxStringSetting({ key: 'other-label', $title: 'Other Label', value: '' }),
              new FxStringSetting({ key: 'other-placeholder', $title: 'Other Placeholder', value: '' }),  
              new FxSelectSetting({key: 'serviceName', $title: 'Service', value: ''}, [{option: 'User Service', value: 'user_service'}, {option: 'Patient Service', value: 'patient_service'},{option: 'Workflow Service', value: 'workflow_service'}]),
              // new FxSelectSetting({key: 'service', $title: 'Service', value: 'local'}, [{option: 'Local', value: 'local'}, {option: 'QA', value: 'qa'},{option: 'UAT', value: 'uat'},{option: 'Production', value: 'prod'}]),   
              // new FxSelectSetting({key: 'isRequired', $title: 'Required', value: true}, [{option: 'Yes', value: true}, {option: 'No', value: false}]),    
               new FxStringSetting({ key: 'errorMessage', $title: 'Error Message', value: 'Please fill out the field' }),  
          ];
        }
      
        protected validations(): FxValidation[] {
          return [FxValidatorService.required];
        }

getOptions(serviceUrl: string, url: string) {
  const finalUrl = serviceUrl + url;
  this.http.get<any[]>(finalUrl).subscribe({
    next: (response:any) => {
      this.options = response?.data;
      this.options.push({ value: 'other', label: 'Other' });
    },
    error: (err) => {
      console.error('Error fetching options', err);
    }
  });
}
}


