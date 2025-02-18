import { NgModule } from '@angular/core';
import { SkillsService } from '../skills/services/skills.service';
import { CVService } from './services/cv.service';

@NgModule({
	providers: [CVService, SkillsService],
})
export class CvModule {}
