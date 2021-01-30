import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllerOptions } from './routing';

export function useSwagger(app: express.Application) {
  const metadatas = (getFromContainer(MetadataStorage) as any)
    .validationMetadatas;
  const schemas = validationMetadatasToSchemas(metadatas);

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routingControllerOptions, {
    components: {
      schemas,
    },
    info: {
      title: 'Potato Diary',
      description: 'Potato Diary API',
      version: '0.0.1',
    },
  });

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec));
}
