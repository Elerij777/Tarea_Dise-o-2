import { randomUUID } from 'node:crypto';
import { jsonResponse } from '../helpers/json_response.js'
import SolicitudModel from '../models/solicitudes.model.js';

export const getAll = async (req, res, next) => {
    try {
        const { estado } = req.query;
        const data = await SolicitudModel.getAll(estado);
        res.status(200).json(jsonResponse({ 
            status: 200,
            message: 'Listado obtenido',
             data }))
    } catch (e) { 
        next(e)
    }
}

export const getById = async (req, res, next) => {
    try {
        const data = await SolicitudModel.getById(req.params.id);
        if (!data) 
            return res.status(404).json(jsonResponse({ 
        status: 404, 
        message: 'No encontrada' }))
        res.json(jsonResponse({ data }))
    } catch (e) { 
        next(e)
    }
};

export const createSolicitud = async (req, res, next) => {
    try {
        const nueva = { 
            id: randomUUID(), 
            ...req.body, 
            estado: 'PENDIENTE', 
            fechaCreacion: new Date().toISOString() 
        };
        const data = await SolicitudModel.createSolicitud(nueva);
        res.status(201).json(jsonResponse({ 
            status: 201,
             data }))
    } catch (e) { 
        next(e) 
    }
}

export const updateSolicitud = async (req, res, next) => {
    try {
        const solicitud = await SolicitudModel.getById(req.params.id);
        if (!solicitud) 
            return res.status(404).json(jsonResponse({ 
        status: 404, 
        message: 'No encontrada' }));
        if (solicitud.estado !== 'PENDIENTE') 
            return res.status(400).json(jsonResponse({ 
        status: 400,
        message: 'Solo se pueden editar solicitudes PENDIENTES' }));
        
        const data = await SolicitudModel.updateSolicitud(req.params.id, req.body);
        res.json(jsonResponse({ data }));
    } catch (e) {
        next(e)
 }
}


export const updateEstado = async (req, res, next) => {
    try {
        const data = await SolicitudModel.updateEstado(req.params.id, req.body.estado);
        if (!data) 
            return res.status(404).json(jsonResponse({ 
        status: 404, 
        message: 'No encontrada' }))
        res.status(200).json(jsonResponse({ 
            status: 200,
            message: 'Estado actualizado', 
            data }))
    } catch (e) { 
        next(e)
    }
}

export const deleteSolicitud = async (req, res, next) => {
    try {
        const success = await SolicitudModel.delete(req.params.id);
        if (!success) 
            return res.status(404).json(jsonResponse({ 
        status: 404, 
        message: 'No encontrada' }));
        res.status(200).json(jsonResponse({ 
            status: 200,
            message: 'Eliminada correctamente' }));
    } catch (e) { 
        next(e)
    }
}