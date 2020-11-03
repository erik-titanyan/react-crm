export const useTooltip = () => {
  let instance
  return {
    bind: (el, html) => {
      instance = window.M.Tooltip.init(el, {html})
    },
    unbind: () => {
      instance.destroy && instance.destroy()
    }
  }
}