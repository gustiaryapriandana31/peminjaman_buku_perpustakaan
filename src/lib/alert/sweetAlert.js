import Swal from 'sweetalert2';

export const alertSuccess = (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: message,
    });
}   

export const alertError = (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Ada Error Nih!!',
        text: message,
    });
}   

export const alertWarning = (message) => {
    return Swal.fire({
        icon: 'warning',
        title: 'Peringatan!',
        text: message,
    });
}   

export const alertConfirm = async (message) => {
    const result = await Swal.fire({
        title: 'Kamu Yakin?',
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7b021eff',
        confirmButtonText: 'Ya, Hapus!'
    });

    return result.isConfirmed;
}