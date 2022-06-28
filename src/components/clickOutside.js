/** Dispatch event on click outside of node
 * from and example here : https://thousandsofraccoons.medium.com/svelte-click-outside-272a27761cd
 */
// export function clickOutside(node) {
//   const handleClick = (event) => {
//     if (node && !node.contains(event.target) && !event.defaultPrevented) {
//       node.dispatchEvent(new CustomEvent("click_outside", node))
//       window.removeEventListener("click", handleClick, true)
//     }
//   }
//   window.addEventListener("click", handleClick, true)
//   return {
//     destroy() {
//       node.removeEventListener("click", handleClick)
//     },
//   }
// }
export function clickOutside(node) {
  const handleClick = (event) => {
    if (!node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent("outclick"))
    }
  }

  document.addEventListener("click", handleClick, true)

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true)
    },
  }
}
