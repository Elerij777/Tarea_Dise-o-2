import solicitudesData from '../mock/solicitud.json' with { type: 'json' };

let solicitudes = [...solicitudesData];
class SolicitudModel {

    static async getAll(estado) {
        return estado ? solicitudes.filter(s => s.estado === estado) : solicitudes;
    }


   static async getById(id) {
        return solicitudes.find(s => s.id === id);
    }
    
   static async createSolicitud(data) {
        solicitudes.push(data);
        return data;
    }
    
    static async updateSolicitud(id, dataActualizada) {
        const index = solicitudes.findIndex(s => s.id === id);
        if (index === -1) return null;
        
        solicitudes[index] = { ...solicitudes[index], ...dataActualizada };
        return solicitudes[index];
    }

    static async updateEstado(id, nuevoEstado) {
        const index = solicitudes.findIndex(s => s.id === id);
        if (index === -1) return null;
        
        solicitudes[index].estado = nuevoEstado;
        return solicitudes[index];
    }

    static async delete(id) {
        const index = solicitudes.findIndex(s => s.id === id);
        if (index === -1) return false;
        
        solicitudes.splice(index, 1);
        return true;
    }
}

export default SolicitudModel;