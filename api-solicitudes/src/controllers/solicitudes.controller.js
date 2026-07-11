import { randomUUID } from 'node:crypto';
import { jsonResponse } from '../helpers/json_response.js'
import SolicitudModel from '../models/solicitudes.model.js';
//import { validateEstado, validateSolicitud } from '../schemas/solicitudes.schema.js'

export const getAllSolicitudes = async (req, res) => {
    try {
        const { estado } = req.query;

        const solicitudes = await SolicitudModel.getAllSolicitudes(estado);

        return res.json(jsonResponse({
            message: 'Listado de solicitudes',
            data: solicitudes
        }));
    } catch (e) {
        return res.status(500).json(jsonResponse({ status: 500, message: e.message, data: null }));
    }
}

export const getSolicitudById = async (req, res) => {
    try {
        const { id } = req.params;
        const solicitud = await SolicitudModel.getSolicitudById(id);

        if (!solicitud) {
            return res.status(404).json(jsonResponse({
                status: 404,
                message: 'Solicitud no encontrada',
            }));
        }
        return res.json(jsonResponse({
            message: 'Información de la solicitud',
            data: solicitud
        }));
    } catch (e) {
        return res.status(500).json(jsonResponse({ status: 500, message: e.message }));
    }
}
export const createSolicitud = async (req, res) => {
    const payload = req.body;
    //const validation = validateSolicitud(payload);

    if (!validation.success) {
        return res.status(400).json(jsonResponse({
            status: 400,
            message: 'No pasó las validaciones',
            data: validation.error.errors
        }));
    }

    try {
        const nuevaSolicitudData = {
            id: randomUUID(),
            ...validation.data,
            estado: 'PENDIENTE',
            fechaCreacion: new Date().toISOString()
        };

        const newSolicitud = await SolicitudModel.createSolicitud(nuevaSolicitudData);

        return res.status(201).json(jsonResponse({
            status: 201,
            message: 'Solicitud creada con éxito',
            data: newSolicitud
        }));

    } catch (e) {
        return res.status(500).json(jsonResponse({ status: 500, message: e.message }));
    }
}

export const updateSolicitud = async (req, res) => {
    const payload = req.body;
    const { id } = req.params;

    //const validation = validateSolicitud(payload);

    if (!validation.success) {
        return res.status(400).json(jsonResponse({
            status: 400,
            message: 'No pasó las validaciones',
            data: validation.error.errors
        }));
    }

    try {
        const existeSolicitud = await SolicitudModel.getSolicitudById(id);

        if (!existeSolicitud) {
            return res.status(404).json(jsonResponse({
                status: 404,
                message: 'La solicitud no existe',
            }));
        }
        if (existeSolicitud.estado !== 'PENDIENTE') {
            return res.status(400).json(jsonResponse({
                status: 400,
                message: `No se puede modificar una solicitud que ya está en estado ${existeSolicitud.estado}`,
            }));
        }
        const dataActualizada = {
            ...existeSolicitud,
            ...validation.data
        };

        const updated = await SolicitudModel.updateSolicitud(id, dataActualizada);

        return res.status(200).json(jsonResponse({
            status: 200,
            message: 'Solicitud modificada exitosamente',
            data: updated
        }));

    } catch (e) {
        return res.status(500).json(jsonResponse({ status: 500, message: e.message }));
    }
}
export const updateSolicitudEstado = async (req, res) => {
    const payload = req.body;
    const { id } = req.params;

    //const validation = validateEstado(payload);

    if (!validation.success) {
        return res.status(400).json(jsonResponse({
            status: 400,
            message: 'Estado no válido',
            data: validation.error.errors
        }));
    }

    try {
        const existeSolicitud = await SolicitudModel.getSolicitudById(id);

        if (!existeSolicitud) {
            return res.status(404).json(jsonResponse({
                status: 404,
                message: 'La solicitud no existe',
            }));
        }
        const updated = await SolicitudModel.updateEstado(id, validation.data.estado);

        return res.status(200).json(jsonResponse({
            status: 200,
            message: `El estado de la solicitud se cambió a ${validation.data.estado}`,
            data: updated
        }));

    } catch (e) {
        return res.status(500).json(jsonResponse({ status: 500, message: e.message }));
    }
}