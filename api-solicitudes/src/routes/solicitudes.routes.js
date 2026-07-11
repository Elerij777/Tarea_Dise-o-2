import { Router } from 'express';
import {
    createSolicitud,
    getAllSolicitudes, getSolicitudById,
    updateSolicitud, updateSolicitudEstado
} from '../controllers/solicitudes.controller.js';
import { isAuth } from '../middlewares/isAuth.js';



const solicitudesRouter = Router();

console.log('Rutas de solicitudes cargadas correctamente');

solicitudesRouter.get('/', getAllSolicitudes);

solicitudesRouter.get('/:id', getSolicitudById);


solicitudesRouter.post('/', isAuth, createSolicitud);

solicitudesRouter.put('/:id', isAuth, updateSolicitud);

solicitudesRouter.patch('/:id/estado', isAuth, updateSolicitudEstado);

export default solicitudesRouter;