type Message = {
    name: string;
    email: string;
    message: string;
};
declare let form: HTMLFormElement;
declare let formMessage: HTMLParagraphElement;
declare let formError: HTMLParagraphElement;
declare function validateForm(message: Message): boolean;
