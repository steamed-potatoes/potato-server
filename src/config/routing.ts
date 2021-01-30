export const routingControllerOptions = {
  cors: true,
  defaultErrorHandler: false,
  controllers: [
    `${__dirname}/../controllers/*.controller{.ts,.js}`,
    `${__dirname}/../controllers/*/*.controller{.ts,.js}`,
  ],
  middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],
};
