import { useToast } from "../hooks/useToast.hook";
import toastMessages from "../hooks/utils/toastMessages";

export default function (e) {
  const {errorToast} = useToast()
  toastMessages[e.code] ? errorToast(toastMessages[e.code]) : 
                          errorToast(toastMessages['error-default'])
  throw e
}