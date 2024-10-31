import type { DirectiveBinding } from "vue";

export type EventClickOutside = MouseEvent & { target: Node };
type ElementOutsideClick = HTMLElement & {
  clickOutsideEvent: (event: EventClickOutside) => void;
};

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive("click-outside", {
    beforeMount(
      el: ElementOutsideClick,
      binding: DirectiveBinding<{
        handler: VoidFunction;
        included?: Array<Node>;
      }>
    ) {
      const { handler, included = [] } = binding.value;

      el.clickOutsideEvent = (e: EventClickOutside) => {
        const targetContainsIncluded: () => boolean = () => {
          return !!included
            .map(include => include.contains(e.target))
            .find(includeContains => !!includeContains);
        };

        if (
          !(
            el === e.target ||
            el.contains(e.target) ||
            targetContainsIncluded()
          )
        )
          handler();
      };

      document.addEventListener(
        "click",
        e => el.clickOutsideEvent(e as EventClickOutside),
        false
      );
    },
    unmounted(el: ElementOutsideClick) {
      document.removeEventListener(
        "click",
        e => el.clickOutsideEvent(e as EventClickOutside),
        false
      );
    },
  });
});
