import { NgModule } from '@angular/core';
import { ContentfullService } from './services/contentfull/contentfull.service';
import { RichTextService } from './services/rich-text/rich-text.service';

@NgModule({
	providers: [ContentfullService, RichTextService],
})
export class ContentfullModule {}
