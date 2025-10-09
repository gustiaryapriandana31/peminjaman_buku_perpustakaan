import Swal from 'sweetalert2';

export const alertSuccess = (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    });
}   

export const alertError = (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Oh No!! Error',
        text: message,
    });
}   

export const alertConfirm = async (message) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7b021eff',
        confirmButtonText: 'Yes, delete it!'
    });

    return result.isConfirmed;
}