import { NgModule } from "@angular/core";
import { SectionsRoutesModule } from "./sections.routes";
import { SectionsContainerComponent } from "./containers/sections-container.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  imports: [
    SectionsRoutesModule, 
    MatButtonModule,
  ],
  declarations: [SectionsContainerComponent, LogoutComponent],
  providers: [

  ]
})
export class SectionsModule {}
