import { Router } from 'express';
import { getAll, getById, createSolicitud, updateSolicitud, updateEstado, deleteSolicitud }
 from '../controllers/solicitudes.controller.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createSolicitudSchema, updateSolicitudSchema, cambioEstadoSchema } from '../schemas/solicitudes.schema.js';




const solicitudesRouter = Router();

console.log('Rutas de solicitudes cargadas correctamente');

solicitudesRouter.get('/', getAll);

solicitudesRouter.get('/:id', getById);


solicitudesRouter.post('/',validateSchema(createSolicitudSchema), createSolicitud);

solicitudesRouter.put('/:id', validateSchema(updateSolicitudSchema), updateSolicitud);

solicitudesRouter.patch('/:id/estado', validateSchema(cambioEstadoSchema), updateEstado);

solicitudesRouter.delete('/:id', deleteSolicitud);

export default solicitudesRouter;