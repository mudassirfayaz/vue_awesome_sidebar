<template>
  <KTMessengerDrawer />
  <KTActivityDrawer />
  <KTHelpDrawer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTMessengerDrawer from "@/layouts/main-layout/extras/MessengerDrawer.vue";
import KTActivityDrawer from "@/layouts/main-layout/drawers/ActivityDrawer.vue";
import KTHelpDrawer from "@/layouts/main-layout/extras/HelpDrawer.vue";

export default defineComponent({
  name: "global-drawers",
  components: {
    KTMessengerDrawer,
    KTActivityDrawer,
    KTHelpDrawer,
  },
});
</script>
