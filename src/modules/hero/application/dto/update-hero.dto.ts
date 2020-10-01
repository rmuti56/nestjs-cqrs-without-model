import { ApiHideProperty } from "@nestjs/swagger";
import { CreateHeroDto } from "./create-hero.dto";

export class UpdateHeroDto extends CreateHeroDto{
    @ApiHideProperty()
    id: string
}