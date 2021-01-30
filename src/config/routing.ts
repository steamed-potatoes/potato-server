export const routingControllerOptions = {
  cors: true,
  controllers: [
    `${__dirname}/../controllers/*.controller{.ts,.js}`,
    `${__dirname}/../controllers/*/*.controller{.ts,.js}`,
  ],
};
