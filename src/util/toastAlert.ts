import { toast } from 'react-toastify';

export function toastAlert(message: string, option: string) {
  switch (option) {
    case 'sucess':
      toast.success(message, {
        className: 'bg-white/30 backdrop-blur-lg text-white rounded-lg p-4 border border-white/40 shadow-lg',
         progressClassName: 'bg-[#FFDE59]',
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      break;
      case 'sucessLogout':
      toast.success(message, {
        className: 'bg-white/30 backdrop-blur-lg text-blue rounded-lg p-4 border border-white/40 shadow-lg',
         progressClassName: 'bg-[#FFDE59]',
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      break;
    case 'info':
      toast.info(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
      break;

    case 'error':
      toast.error(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
      break;

    default:
      toast.info(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
      break;
  }
}