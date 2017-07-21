import { BrowserModule, DomSanitizer, SafeResourceUrl, SafeUrl  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import {SidebarServiceService} from './components/sidebar/services/sidebar-service.service';
import {CustomPipe} from './safeHtml.pipe'
import {SafePipe} from './safeUrl.pipe'
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import { NgxDnDModule } from  '@swimlane/ngx-dnd';
import { NgxUIModule } from '@swimlane/ngx-ui';
import { ClipboardModule } from 'ngx-clipboard';
import { PropertyComponent } from './property/property.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ng2-tag-input';
import {CustomPipeForKey} from './keys'
import {NguiCollapsableModule} from '@ngui/collapsable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';

import * as FileSaver from 'file-saver';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CanvasComponent,
    CustomPipe,
    SafePipe,
    CustomPipeForKey,
    PropertyComponent
    
  ],
  imports: [
    NgxUIModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NguiCollapsableModule,
    NgxDynamicTemplateModule.forRoot({}),
    AccordionModule.forRoot(),
    NgxDnDModule,
    BrowserModule,
    ClipboardModule,
    BrowserAnimationsModule,
    TagInputModule,
     BootstrapModalModule.forRoot({container:document.body})
  
  ],
  providers: [SidebarServiceService]
  ,bootstrap: [AppComponent]
})
export class AppModule { }
