
export const jsonResponse = ({ status = 200, message = 'Operación realizada con éxito', data = null }) => {

    return {
        status,
        success: status >= 200 && status < 300,
        message,
        data
    }
}