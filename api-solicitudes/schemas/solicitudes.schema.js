import * as z from 'zod'

export const solicitudSchema = z.object({
    id: z.string().uuid({ message: 'El formato del ID debe ser un UUID v4 válido' }),
    dniCliente: z
    .string({
        message: "El DNI del cliente es obligatorio.",
    })
    .min(13, "El DNI debe tener al menos 13 caracteres.")
    .max(15, "El DNI no puede exceder los 15 caracteres."),
    nombreCompleto: z.string()
    .min(3, { message: 'El nombre es demasiado corto' })
    .max(150, { message: 'El nombre es demasiado largo' }),
    montoSolicitado: z.number()
    .positive({ message: 'El monto solicitado debe ser mayor a cero' }),
    plazoMeses: z.number()
    .int({ message: 'El plazo debe ser un número entero de meses' })
    .positive({ message: 'El plazo debe ser mayor a cero' }),
    tasaInteres: z.number()
    .nonnegative({ message: 'La tasa de interés no puede ser negativa' }),
    estado: z.enum(['PENDIENTE', 'APROBADA', 'RECHAZADA'], {
        errorMap: () => ({ message: 'El estado debe ser PENDIENTE, APROBADA o RECHAZADA' })
    }),

    fechaCreacion: z.string().datetime({ message: 'La fecha de creación debe ser un formato válido' })
}).strict()

export const cambioEstadoSchema = z.object({
    estado: z.enum(['APROBADA', 'RECHAZADA'], {
        errorMap: () => ({ message: 'El estado solo puede ser APROBADA o RECHAZADA' })
    })
}).strict();

export const validateSolicitud = (solicitud) => {
    return solicitudSchema.safeParse(solicitud);
};

export const validateEstado = (estadoData) => {
    return cambioEstadoSchema.safeParse(estadoData);
};