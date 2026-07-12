import * as z from 'zod'

export const createSolicitudSchema = z.object({
    
    dniCliente: z.string({
        message: "El DNI del cliente es obligatorio.",
    })
    .min(13, "El DNI debe tener al menos 13 caracteres.")
    .max(15, "El DNI no puede exceder los 15 caracteres."),

    nombreCompleto: z.string()
    .min(5, { message: 'El nombre es demasiado corto' })
    .max(100, { message: 'El nombre es demasiado largo' }),

    montoSolicitado: z.number()
    .min(1000, { message: 'El monto solicitado debe ser mayor o igual a 1000' })
    .max(100000, { message: 'El monto solicitado no puede exceder los 100000' }),

    plazoMeses: z.number()
    .int({ message: 'El plazo debe ser un número entero de meses' })
    .min(1, { message: 'El plazo minimo es de 1 mes' })
    .max(60, { message: 'El plazo no puede exceder los 60 meses' }),

    tasaInteres: z.number()
    .nonnegative({ message: 'La tasa de interés no puede ser negativa' })
    .default(5.0, { message: 'La tasa de interés por defecto es 5.0%' }),

}).strict()

export const cambioEstadoSchema = z.object({
    estado: z.enum(['APROBADA', 'RECHAZADA'], {
        errorMap: () => ({ message: 'El estado solo puede ser APROBADA o RECHAZADA' })
    })
}).strict();

export const updateSolicitudSchema = createSolicitudSchema.omit({ dniCliente: true }).partial();