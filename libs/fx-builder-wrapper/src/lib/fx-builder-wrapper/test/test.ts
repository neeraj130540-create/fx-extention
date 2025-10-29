import { Component } from '@angular/core';
import { FxComponentBuilder, FxForm, FxUtils } from '@instantsys-labs/fx';

@Component({
  standalone: true,
  selector: 'lib-test',
  imports: [FxComponentBuilder],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  fxForm: FxForm = FxUtils.createNewForm();
}

