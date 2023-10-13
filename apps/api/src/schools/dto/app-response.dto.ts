export class AppResponseDto {
    constructor(
      public statusCode: Number,
      public data: any = undefined,
      public message: string = 'Success',
    ) {}
  }