import {createStandaloneToast} from "@chakra-ui/react";
import {PayloadError} from "@/types/api.types.ts";


const toast = createStandaloneToast();

class AlerterService {
    success(message: string) {
        toast.toast({
            title: message,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
        });
    }
    error(message: { errors: PayloadError[] } | string) {
        if (typeof message === 'string') {
            toast.toast({
                title: message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            toast.toast({
                title: message.errors[0].message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        }
    }
    warning(message: string) {
        toast.toast({
            title: 'Warning',
            description: message,
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
        });
    }
    info(message: string) {
        toast.toast({
            title: 'Info',
            description: message,
            status: 'info',
            variant: 'subtle',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
        });
    }
}
export const Alerter = new AlerterService();
