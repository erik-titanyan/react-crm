export const useToast = () => {
    return {
        successToast: (html) => window.M.toast({html}), 
        errorToast: (html) => window.M.toast({html: `[Error] ${html}`}) 
    }
}