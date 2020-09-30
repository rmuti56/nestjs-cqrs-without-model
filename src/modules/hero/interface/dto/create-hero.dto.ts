import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateHeroDto{
    @IsString()
    readonly  name: string

    @IsNumber()
    @IsOptional()
    readonly attack?: number

    @IsNumber()
    readonly defence: number

    @IsNumber()
    readonly energy: number

    @IsNumber()
    readonly intelligence: number
}