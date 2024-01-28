
import {Toast, ToastContainer} from 'react-bootstrap';
import "../css/toast.css"

const ToastStatus = {
    SUCCESS: {
        className: 'success',
        title: 'Success!',
    },
    ERROR: {
        className: 'danger',
        title: 'Error!',
    },
}

const StatusToast = ({messageSaveToastHook}) => {
    let [messageSaveToast, setMessageSaveToast] = messageSaveToastHook
    return (
        <ToastContainer
            className="p-3"
            position={"bottom-center"}
            containerPosition={"fixed" }
            style={{ zIndex: 1 }}
        >
            <Toast onClose={() => setMessageSaveToast({
                show: false,
                message: messageSaveToast.message,
                status: messageSaveToast.status
            })} show={messageSaveToast.show} delay={3000} autohide={true} animation={true}>
                <Toast.Header className={'header-' + messageSaveToast.status.className + ' text-white'} closeButton={true}>
                    <strong className="me-auto">{messageSaveToast.status.title}</strong>
                </Toast.Header>
                <Toast.Body className={"toast-body text-bg-"+ messageSaveToast.status.className + " p-2"}>{messageSaveToast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export {ToastStatus, StatusToast}