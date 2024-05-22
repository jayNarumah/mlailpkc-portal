import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShortenPipe } from "src/api/helpers/shorten-word.pipe";

@NgModule({
    declarations: [ShortenPipe],
    imports: [CommonModule],
    exports: [ShortenPipe],
})

export class SharedModule { }
