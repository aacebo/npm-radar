import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[nrrSidenavBody]',
})
export class SidenavBodyDirective {
  constructor(readonly template: TemplateRef<any>) { }
}
